import express, { response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient

app.use(express.json());
app.use(cors());

//CRUD for Users

app.get("/api/users/", async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users)
});


app.post("/api/users/", async (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password){
        return res.status(400)
        .send("Username and password fields required")
    }
   
   try{ const user = await prisma.user.create({
        data: {username, password, role }
    })
    res.json(user);
}
catch (error) {
    res.status(500)
        .send("Oops, something went wrong")
}
});

app.delete("/api/users/:id", async (req, res) => {

 const id = parseInt(req.params.id);

    if (!id || isNaN(id)){
        return res.status(400)
        .send("ID must be a valid number")
    }

    try {
        await prisma.user.delete({
            where: {id}
        });
        res.status(204).send();
    }
    catch(error) {
        res.status(500)
            .send("Oops, something went wrong")
    }
});

app.put("/api/users/:id", async (req, res) => {

    const {username, password, role } = req.body;
    const id = parseInt(req.params.id);
    if (!username || !password){
        return res.status(400)
        .send("Title and content fields required")
    }

    if (!id || isNaN(id)){
        return res.status(400)
        .send("ID must be a valid number")
    }

    try {
        const updatedUser = 
        await prisma.user.update({
            where: {id},
            data: {username, password, role },
        })
        res.json(updatedUser);
    }
    catch(error) {
        res.status(500)
            .send("Oops, something went wrong")
    }
});


//CRUD for Notes

app.post("/api/notes/", async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content){
        return res.status(400)
        .send("Title and content fields required")
    }
   
   try{ const note = await prisma.note.create({
        data: {title, content}
    })
    res.json(note);
}
catch (error) {
    res.status(500)
        .send("Oops, something went wrong")
}
});

app.put("/api/notes/:id", async (req, res) => {

    const {title, content} = req.body;
    const id = parseInt(req.params.id);
    if (!title || !content){
        return res.status(400)
        .send("Title and content fields required")
    }

    if (!id || isNaN(id)){
        return res.status(400)
        .send("ID must be a valid number")
    }

    try {
        const updatedNote = 
        await prisma.note.update({
            where: {id},
            data: {title, content},
        })
        res.json(updatedNote);
    }
    catch(error) {
        res.status(500)
            .send("Oops, something went wrong")
    }
});

app.delete("/api/notes/:id", async (req, res) => {

    const id = parseInt(req.params.id);

    if (!id || isNaN(id)){
        return res.status(400)
        .send("ID must be a valid number")
    }

    try {
        await prisma.note.delete({
            where: {id}
        });
        res.status(204).send();
    }
    catch(error) {
        res.status(500)
            .send("Oops, something went wrong")
    }
});

app.listen(5000, () => {
    console.log("server running on localhost:5000");
});
