const expect = require('chai').expect;

const recipes = require('./recipes');

describe('Day 14: Chocolate Charts', () => {
 
  describe('Part One', () => {

    var sampleTests = [
      {arg: 9, expected: '5158916779'},
      {arg: 5, expected: '0124515891'},
      {arg: 18, expected: '9251071085'},
      {arg: 2018, expected: '5941429882'}
    ];

    sampleTests.forEach(function(test) {
      it('After ' + test.arg + ' recipes, score should be ' + test.expected, function() {
        expect(recipes.getScore(test.arg)).to.equal(test.expected);
      }).timeout(500000);
    });

    it.skip('After 293801 recipes, score should be', () => {
      expect(recipes.getScore(293801)).to.equal('3147574107');
    });
  });

  describe('Part One - Arrays', () => {

    var sampleTests = [
      {arg: 9, expected: '5158916779'},
      {arg: 5, expected: '0124515891'},
      {arg: 18, expected: '9251071085'},
      {arg: 2018, expected: '5941429882'}
    ];

    sampleTests.forEach(function(test) {
      it('After ' + test.arg + ' recipes, score should be ' + test.expected, function() {
        expect(recipes.getScoreArray(test.arg)).to.equal(test.expected);
      });
    });

    it('After 293801 recipes, score should be', () => {
      expect(recipes.getScoreArray(293801)).to.equal('3147574107');
    });
  });

  describe('Part Two', () => {
    var sampleTests = [
      {arg: '51589', expected: 9},
      {arg: '01245', expected: 5},
      {arg: '92510', expected: 18},
      {arg: '59414', expected: 2018}
    ];

    sampleTests.forEach(function(test) {
      it('To get score of ' + test.arg + ', should need ' + test.expected + ' recipes', function() {
        expect(recipes.getRecipeNoArray(test.arg)).to.equal(test.expected);
      });
    });

    it('To get score of 293801, should need ', () => {
      expect(recipes.getRecipeNoArray('293801')).to.equal(20280190);
    }).timeout(10000);
  });
});
