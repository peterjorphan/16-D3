// Load data from data.csv
d3.csv("assets/data/data.csv", function(error, data) {

    // Log an error if one exists
    if (error) return console.warn(error);
  
    // Print the Data
    console.log(data);

});
