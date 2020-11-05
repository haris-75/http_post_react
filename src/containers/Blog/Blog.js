import React, { Component } from 'react';
import axios from '../../axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state = {
        posts: [],
        selectedPost: null,
        error: false
    }

    componentDidMount()
    {
        axios.get('/posts')
        .then(response =>{
            
            const posts = response.data.slice(0,4);
            console.log('Response received');
            console.log(response);

            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    author: 'Harish'
                }
            })

            this.setState({ posts: updatedPosts});
        })
        .catch(error =>{
            this.setState({error: error})
        });
    }

    postClickedHandler = (id) => {
        this.setState({selectedPost: id});
    }

    render () {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>
        if(!this.state.error){
            posts = this.state.posts.map(post => {
                return <Post 
                    key={post.id} 
                    title={post.title}
                    author={post.author}
                    clicked={() => this.postClickedHandler(post.id)}
                    />
        })}
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost postid={this.state.selectedPost} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;