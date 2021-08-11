const parse = require('csv-parse');

const fs = require('fs');

const habitablePlanets = []
const max_survivable_light = 1.11;
const min_survivable_light = 0.36


function isHabitablePlanet(planet) {

    return planet['koi_disposition'] === 'CONFIRMED' 
    && planet['koi_insol'] > min_survivable_light && planet['koi_insol'] < max_survivable_light;
}

    
fs.createReadStream('kepler_data.csv')
    .pipe(parse({
        comment: '#',
        columns: true
    }))
    .on('data', (data) => {
        if(isHabitablePlanet(data)) {
            habitablePlanets.push(data);
        }
    })
    .on('error', (error) => {
        console.log(error);
    })
    .on('end', () => {
        console.log(habitablePlanets);
        console.log('End');
    });




