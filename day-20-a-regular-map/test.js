const expect = require('chai').expect;
const fs = require('fs');

const map = require('./map');

describe.only('Day 20: A Regular Map', () => {

  describe('Part One', () => {
    it('execute sample program and return reg 0', () => {
      const expected = 
     `#####
      #.|.#
      #-###
      #.|X#
      #####`;
      expect(map.drawGridFromInstructions('^WNE$')).to.equal(expected);
    });

    it('execute sample program and return reg 0', () => {
      const expected = 
    `#?#?#?#?#
     ?.|.|.|.?
     #?#?#?#-#
         ?X|.?
         #?#?#`;
      expect(map.drawGridFromInstructions('^ENWWW$')).to.equal(expected);
    });

    it('execute sample program and return reg 0', () => {
      const expected = 
    `#?#?#?#?#
     ?.|.|.|.?
     #-#?#?#?#
     ?.|.|.|.?
     #?#?#?#-#
         ?X|.?
         #?#?#`;
      expect(map.drawGridFromInstructions('^ENWWW(NEEE)$')).to.equal(expected);
    });

    it('execute sample program and return reg 0', () => {
      const expected = 
   `#?#?#?#?#
   ?.|.|.|.?
   #-#?#?#?#
   ?.|.|.|.?
   #-#?#?#-#
   ?.?.?X|.?
   #-#-#?#?#
   ?.|.|.|.?
   #?#?#?#?#`;
      expect(map.drawGridFromInstructions('^ENWWW(NEEE|SSE(EE|N))$')).to.equal(expected);
    });

    it('execute sample program and return reg 0', () => {
      expect(map.findFurthestRoom('^ENWWW(NEEE|SSE(EE|N))$')).to.equal(10);
    });

    it('execute sample program and return reg 0', () => {
      expect(map.findFurthestRoom('^ENNWSWW(NEWS|)SSSEEN(WNSE|)EE(SWEN|)NNN$')).to.equal(18);
    });

    it('execute sample program and return reg 0', () => {
      expect(map.findFurthestRoom('^ESSWWN(E|NNENN(EESS(WNSE|)SSS|WWWSSSSE(SW|NNNE)))$')).to.equal(23);
    });

    it('execute sample program and return reg 0', () => {
      expect(map.findFurthestRoom('^WSSEESWWWNW(S|NENNEEEENN(ESSSSW(NWSW|SSEN)|WSWWN(E|WWS(E|SS))))$')).to.equal(31);
    });

    it.skip('execute input file program and return reg 0', () => {
      const input = fs.readFileSync('day-20-a-regular-map/input.txt').toString();
      expect(map.findFurthestRoom(input)).to.equal(31);
    }).timeout(10000);
  });

  // describe('Part Two', () => {
  //   it('execute input file program and return reg 0', () => {
  //     const input = fs.readFileSync('day-19-go-with-the-flow/input.txt').toString();
  //     expect(map.executeProgram(input,1)).to.equal(1248);
  //   }).timeout(10000);
  // });
});
