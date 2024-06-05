// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//factory funtction for create specimen
const  pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    //Create a random mutation on one base
    mutate() {
      let newBase = returnRandBase();
      const indexBase = Math.floor(Math.random() * 15);
      while (dna[indexBase] === newBase) {
        newBase = returnRandBase();
      }
      return dna.splice(indexBase, 1, newBase);
    },

    //Compare DNA with another specimen and return % in common
    compareDNA(otherSpec){
      let sameBase = 0
      for (let i=0; i<dna.length; i++){
        if (dna[i] === otherSpec.dna[i]){
          sameBase ++;
        }
      }
      const percentage = sameBase*100/dna.length;
      //console.log(`The specimen n°${specimenNum} and the specimen n°${otherSpec.specimenNum} have ${percentage}% DNA in common`);
      return percentage;
    },

    //  Capacity to survive: If C + G > 60%
    willLikelySurvive(){
      let countGC = 0
      for (let i=0; i<dna.length; i++){
        if(dna[i] === 'C' || dna[i] === 'G'){
          countGC++;
        }
      }
      return countGC*100/dna.length >= 60
    },

    //creat DNAc
    complementStrand() {
      let dnaC = dna.map(base => {
        if(base === 'A'){
          return 'T';
        } else if (base === 'T') {
          return 'A';
        } else if (base === 'C') {
          return 'G';
        }else{
          return 'C'
        }
      });
      return dnaC;
    }
  };
}

// create array with 30 specimens with willLikelySurvive === true
let pAequorArr = [];
count = 0;
while (pAequorArr.length <5000) {
  let obj = pAequorFactory(count, mockUpStrand());
  if (obj.willLikelySurvive() === true){
    pAequorArr.push(obj);
    count++;
  }
}

//console.log(pAequorArr);


// Compare dna between all the specimen to know the most related ones
const mostRelated = specArray => {
  let maxPercent = 0;
  let specimen1 = 0;
  let specimen2 = 0;
  for (let i=0; i<specArray.length-1; i++){
    for (let j=i+1; j<specArray.length; j++){
      const percentage = specArray[i].compareDNA(specArray[j]);
      if (percentage > maxPercent){
        maxPercent = percentage;
        specimen1 = i;
        specimen2 = j;
      }
    }
  }
  console.log(`Specimen ${specimen1} et ${specimen2} are the most related with ${maxPercent}% DNA in common`);
}

mostRelated(pAequorArr);


