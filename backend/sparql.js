// sparql.js
const axios = require('axios');
const endpointUrl = 'https://query.wikidata.org/sparql';

/**
 * بناء استعلام SPARQL للبحث عن كيان بناءً على keyword
 */
function buildQuery(keyword) {
    // تنظيف الكلمة المدخلة
    const sanitizedKeyword = keyword.trim().replace(/[\s,]+/g, ' '); // إزالة المسافات الزائدة
    return `
    SELECT ?item ?itemLabel ?itemAlias ?itemDescription WHERE {
      {
        ?item rdfs:label ?itemLabel.
        FILTER(LANG(?itemLabel) = "en" && ?itemLabel = "${sanitizedKeyword}")
      }
      UNION
      {
        ?item skos:altLabel ?itemAlias.
        FILTER(LANG(?itemAlias) = "en" && CONTAINS(LCASE(?itemAlias), LCASE("${sanitizedKeyword}")))
      }
      UNION
      {
        ?item schema:description ?itemDescription.
        FILTER(LANG(?itemDescription) = "en" && CONTAINS(LCASE(?itemDescription), LCASE("${sanitizedKeyword}")))
      }
    }
    LIMIT 10
    `;
}



/**
 * إرسال الاستعلام وتنفيذ الطلب
 */
async function querySPARQL(keyword) {
    const query = buildQuery(keyword);

    const headers = {
        'Accept': 'application/sparql-results+json'
    };

    try {
        const response = await axios.get(endpointUrl, {
            params: { query },
            headers
        });

        if (!response.data || !response.data.results || !response.data.results.bindings) {
            console.warn('No results found in response');
            return []; // إرجاع مصفوفة فارغة إذا لم يتم العثور على نتائج
        }

        // تحقق من أن النتائج تحتوي على itemLabel أو itemAlias
        return response.data.results.bindings.map(item => {
            const label = item.itemLabel ? item.itemLabel.value : (item.itemAlias ? item.itemAlias.value : 'No Label');
            
            if (item.item && item.item.value && label !== 'No Label') {
                return {
                    id: item.item.value,
                    label: label
                };
            } else {
                console.warn('Missing value in response:', item);
                return null;
            }
        }).filter(item => item !== null); // فلترة العناصر الفارغة
    } catch (error) {
        console.error('Error fetching data from SPARQL endpoint:', error);
        throw new Error('Error fetching data from SPARQL endpoint');
    }
}


module.exports = { querySPARQL };
