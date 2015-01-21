var fs = require('fs');

module.exports = function () {
    var movies;

    // constructor
    var MovieProvider = function () {
        fs.readFile(__dirname + '/moviedata.json', function (error, content) {
            if (error) {
                console.log("MovieProvider Error: " + error)
            }
            else {
                var rawData = getDataFromContent(content);
                rawData = translateRawData(rawData);
                movies = rawData;
            }
        });
    };

    // translate the column structure to object structure, it's more useful this way
    function translateRawData(rawData) {
        var columns = rawData.meta.view.columns;
        var data = rawData.data;
        var movies = [];
        for (var i = 0; i < data.length; i++) {
            var movie = translateRow(columns, data[i]);
            if (movie.Locations && movie.Title)
            {
                movies.push(movie);
            }
        }
        return movies;
    }

    function translateRow(columns, row) {
        var columnsToSkip = 8; // the first 8 columns are aren't really useful
        var obj = {};
        for (var i = columnsToSkip; i < columns.length; i++) {
            var column = columns[i];
            var columnName = column.name.replace(' ', '');
            obj[columnName] = row[i];
        }
        return obj;
    }

    function getDataFromContent(content) {
        content = content + ""; // make sure the content is a string
        var idx = content.indexOf("{"); // could be garbage data at the beginning depending on file system
        content = content.substring(idx);
        return JSON.parse(content);
    }

    MovieProvider.prototype = {
        getMovies: function () {
            return JSON.stringify(movies);
        }
    };

    return new MovieProvider();
};