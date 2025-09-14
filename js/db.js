db.collection('recipes').onSnapshot((snapshot) => {
    // console.log(snapshot.docChanges()); 
    snapshot.docChanges().forEach(change => {
        // if(change.type === "added"){
        //     console.log("New Recipe:", change.doc.data());
        // }
        // if(change.type === "removed"){
        //     console.log("New Recipe:", change.doc.data());
        // }
        console.log(change, change.doc.data(), change.doc.id);
        
    })
})