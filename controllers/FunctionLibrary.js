module.exports = {

	dslTranslator: (jsonquery) => {
		//loop object
    let must = []
		for (const [key, value] of Object.entries(jsonquery)) {
			// console.log(`${key}: ${value}`);
			//area olah 
			if (Array.isArray(value)) {
        //ini array, gunakn terms
        // console.log(termsConfig(key,value))
        must.push(termsConfig(key,value));        
			} else if (typeof value == 'number') {
        //ini number, kemungkinan term 
        must.push(termConfig(key,Number(value)));
      } else {

        if (value.includes('>')) {
          // console.log(moreThanConfig(key,value))
          must.push(moreThanConfig(key,value));
        } else if (value.includes('<')) {
          // console.log(lessThanConfig(key,value))
          must.push(lessThanConfig(key,value));
        } else if (value.includes('between')) {
          // console.log(betweenConfig(key,value))
          must.push(betweenConfig(key,value));
        } else if (value.includes('like')) {
          // console.log('key', key)
          // console.log(wildCardConfig(key,value))
          must.push(wildCardConfig(key,value));
        } else {
          must.push(termConfig(key,value));
        }

			}

		}


    return {
      "query": {
        "bool": {
          must
        }
      }
    }

	},

}

const termConfig = (key, value) => {
	return {
		"term": {
			[key.toLowerCase() + '.keyword']: {
				"value": value,
				"boost": 1.0
			}
		}
	}
}

const wildCardConfig = (key, value) => {
  const newVal = (value.replace('like', '').trim())
    return {
        "wildcard": { 
            [key.toLowerCase() + '.keyword']: {
                "wildcard": '*'+newVal+'*',
                "boost": 1.0
            }
        }
    }
}

const termsConfig = (key, value) => {
	return {
		"terms": {
      [key.toLowerCase() + '.keyword']: value,
			"boost": 1.0
		}
	}
}

const lessThanConfig = (key, value) => { 
  const newVal = Number(value.replace('<', '').trim())
	return {
		"range": {
			[key.toLowerCase()]: {
				"from": null,
				"to": newVal,
				"include_lower": false,
				"include_upper": false,
				"boost": 1.0
			}
		}
	}
}

const moreThanConfig = (key, value) => {
  const newVal = Number(value.replace('>', '').trim())
	return {
		"range": {
			[key.toLowerCase()]: {
				"from": newVal,
				"to": null,
				"include_lower": false,
				"include_upper": false,
				"boost": 1.0
			}
		}
	}
}

const betweenConfig = (key, value) => {
    let newVal = value.replace('between', '') 
    let re = new RegExp('\'', 'g');
    let re2 = new RegExp('\"', 'g');
    const datefrom = newVal.split('and')[0].trim().replace(re, '').replace(re2, '')
    const dateto = newVal.split('and')[1].trim().replace(re, '').replace(re2, '')
    return {
        "range": {
            [key.toLowerCase()]: {
                "from": datefrom,
                "to": dateto,
                "include_lower": true,
                "include_upper": true,
                "time_zone": "Z",
                "boost": 1.0
            }
        }
    }
}