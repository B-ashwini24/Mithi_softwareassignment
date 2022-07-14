const fs = require('fs').promises

const readFiles = async(path) => {
  try{
    const data = await fs.readFile(path, 'utf-8');
    return data;
  }catch(e){
    console.log(e);
  }
}
const { EOL } = require('os');
let pag1;
let pag2;
let pag3;
let word1=[];
let word2=[]
let excl;


const writeIndex = (exclude, data1, data2, data3) => {
    pag1=data1.split(/\r?\n?\s/)
    pag2=data2.split(/\r?\n?\s/)
    pag3=data3.split(/\r?\n?\s/)
    excl=exclude.split(/\r?\n?\s/)
    pag1.map((ele)=>{
      console.log( (ele.match(/^[a-zA-Z]*$/)))
        if( !(word1.includes(ele)) && !(excl.includes(ele)) && !(ele.match(/\d+/g))  )
        {
            word1.push(ele+":  "+1)
        }
    })
    pag2.map((ele)=>{
        if(!excl.includes(ele) && !(ele.match(/\d+/g))  )
        {
          if( !(word1.includes(ele)))
          {
             
                  word1.push(ele+":  "+2)
             
          }
          if( pag1.includes(ele))
          {
           let j=word1.indexOf(ele+":  "+2)
            word1.splice(j,1)
            let  i=word1.indexOf(ele+":  "+1)
             // console.log(i)
              word1.splice(i,1)
               word1.push(ele+":  "+1+","+2)
           
          }
         
        }
          
      })
      pag3.map((ele)=>{
        if(!excl.includes(ele) && !(ele.match(/\d+/g))  )
        {
           if( !(word1.includes(ele)) )
          {
              word1.push(ele+":  "+3)
          
          }
          if( pag1.includes(ele) && pag2.includes(ele) )
          {
           
            let k=word1.indexOf(ele+":  "+1+","+2)
             word1.splice(k,1)
            let j=word1.indexOf(ele+":  "+3)
            word1.splice(j,1)
            let i=word1.indexOf(ele+":  "+1)
              word1.splice(i,1)
                       
              word1.push(ele+":  "+1+","+2+","+3)
            
          }
         else if( pag1.includes(ele))
          {
            let j=word1.indexOf(ele+":  "+3)
            word1.splice(j,1)
              let i=word1.indexOf(ele+":  "+1)
              word1.splice(i,1)
              word1.push(ele+":  "+1+","+3)
            
          }
         else if( pag2.includes(ele) )
          {
           let j=word1.indexOf(ele+":  "+3)
            word1.splice(j,1)
            let i=word1.indexOf(ele+":  "+2)
         //  console.log(i)
              word1.splice(i,1)
              word1.push(ele+":  "+2+","+3)
            
          }
         
        }
       
      })
      word1.map((ele)=>{
        if(!word2.includes(ele) )
        {
            word2.push(ele)
        }
      })
      word2.sort()
      word2.map((ele)=>{
        
            fs.appendFile('index12.txt',ele+EOL, err => {
                if (err) {
                  console.error(err);
                }
              
              });
        
        
    })   

           
    
}



(async function(){
    const data1 = await readFiles('Page1.txt');
    const data2 = await readFiles('Page2.txt');
    const data3 = await readFiles('Page3.txt');
    const exclude = await readFiles('exclude.txt');
    writeIndex(exclude, data1, data2, data3)
  })();