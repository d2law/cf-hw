async function main (){
    
    var count = 0 ;
    for (var i = 0 ; i < 100; i++) {
        console.log("number event =>" + count + " start");
        
        
        await saveItem({});        

        console.log("number event =>" + count + " end");    
        count++;
    }
    
    return ;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function saveItem(input) {
    await sleep(1000);
    console.log("boo");
  }

main();
