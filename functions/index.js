import functions from "firebase-functions"
import express from "express"
import cors from "cors"
import { createNewAlbum, getAllAlbums, deleteAlbum } from "./src/albums.js"


const app = express()
app.use(cors())
app.use(express.json())

app.get('/albums', getAllAlbums)
app.post('/albums', createNewAlbum)
app.delete('/albums/:albumId', deleteAlbum)

export const api = functions.https.onRequest(app)


