# read-and-filter-json :sparkles:

A library to to parse out specific JSON objects of a larger JSON array based on a provided set of criteria. This makes it easier to filter out json objects on any given JSON array. 

* [Installation](#installation)

## Installation 

Install via npm

```
npm install 
```

## Start

```
npm start
```

### Write up

If I have unlimited time and budget, I would take a different approach to this solution. I would use AWS Lambda functions to read and write the data. I would set up a database such as DynamoDB or s3 to store the json files. With DynamoDB we could use the in-memory caching support and DynamoDB Accelerator (DAX) to minimize the data reading time to microseconds. 

### Additional Documentation

This solution assumes that the data in each sample json file is the same accross all json records. This solutions also assume you have node version 18 or older installed on your machine.


