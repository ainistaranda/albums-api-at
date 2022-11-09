import dbConnect from "./dbConnect.js";

export function getAllAlbums(req, res) {
  const db = dbConnect();
  db.collection("albums")
    .get()
    .then((collection) => {
      const albumsArr = collection.docs.map((doc) => {
        return { ...doc.data(), albumId: doc.id };
      });
      res.send(albumsArr);
    })
    .catch((err) => res.status(500).send({ success: false, message: err }));
}

export function createNewAlbum(req, res) {
  const db = dbConnect();
  db.collection("albums")
    .add(req.body)
    .then(() => getAllAlbums(req,res))
    // .then(doc => res.status(201).send({ success: true, message: 'Album created: ' + doc.id }))
    .catch((err) => res.status(500).send({ success: false, message: err }));
}
export function deleteAlbum(req, res) {
  const { albumId } = req.params;
  const db = dbConnect();
  db.collection("albums")
    .doc(albumId)
    .delete()
    .then(doc => res.status(202).send({ success: true, messsage: "Album Deleted" + albumId}))
    .catch((err) => res.status(500).send({ success: false, message: err }));
  
}


