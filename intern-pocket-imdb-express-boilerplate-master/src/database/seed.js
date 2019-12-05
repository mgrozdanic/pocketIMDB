import Movie from '../models/movie.model';
import User from '../models/user.model';

const movie1 = new Movie({
    title:"It",
    description:"In the summer of 1989, a group of bullied kids band together to destroy a shape-shifting "+
    "monster, which disguises itself as a clown and preys on the children of Derry, their small Maine town.",
    imageUrl:""
});
const movie2 = new Movie({
    title:"Inception",
    description:"A thief who steals corporate secrets through the use of dream-sharing technology is "+
    "given the inverse task of planting an idea into the mind of a C.E.O.",
    imageUrl:""
});
const movie3 = new Movie({
    title:"Interstellar",
    description:"A team of explorers travel through a wormhole in space in an attempt to "+
    "ensure humanity's survival.",
    imageUrl:""
});
const movie4 = new Movie({
    title:"The Godfather",
    description:"The aging patriarch of an organized crime dynasty transfers control of his clandestine"+
    " empire to his reluctant son.",
    imageUrl:""
});

const user1 = new User({
    name:"User",
    email:"user@gmail.com",
    password:"123456789"
});

movie1.save();
movie2.save();
movie3.save();
movie4.save();

user1.save();