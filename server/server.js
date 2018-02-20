const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();

const { Model } = require('objection')
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: "localhost",
        user: "root",
        password: "Concordia12",
        database: "blogdb",
        charset: "utf8"
    }
});

Model.knex(knex);

class Post extends Model {
    static get tableName(){
        return "posts"
    }
}

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json())


async function getPosts() {
    const postList = await Post.query().orderBy('post_id', "desc")
    return postList
}

async function getPostById(id) {
    const singlePost = await Post.query().where("post_id", id)
    return singlePost
}

async function getPostsWithTag(tag){
    const postList = await Post.query().where('tags', "like", tag)
    return postList;
}

async function makePost(post) {
    await Post
        .query()
        .insert(post);
    
}

app.get('/posts', (req, res) => {
    getPosts().then( data => {
        res.send(data)
    })
})

app.get('/post/:post_id', (req, res) => {
    getPostById(req.params.post_id)
        .catch(err => console.log(err))
        .then( data => {
            console.log('GOT SINGLE POST', data);
            res.send(data)
        })
})

app.get('/posts/tags/:tag', (req, res) => {
    getPostsWithTag(req.params.tag)
        .catch(err => console.log(err))
        .then( data => {
            console.log('GOT TAG LIST', data);
            res.send(data)
        })
})

app.post('/posts', (req, res) => {
    console.log(req.body);
    makePost(req.body)
        .then( data => {
            res.send(true);
        })
})


app.listen( 3000, () => {
    console.log("Started on 3k");
})