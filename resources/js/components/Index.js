import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Index extends Component {

    constructor(props){
        super(props);

        this.state = {
            news: [],
            body: '',
            title: '',
            idToUpdate: ''
        }

        this.handleBody = this.handleBody.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleBody(e){
        // console.log(e.target.value)
        this.setState({body:e.target.value});
    }

    handleTitle(e){
        this.setState({title:e.target.value});
    }

    handleSave(e){
        e.preventDefault();

        axios.post('/savenews', {
            "title" : this.state.title,
            "body" : this.state.body
        }).then(response=>{

            this.setState({
                news:response.data,
                title: '',
                body: ''
            });

        }).catch(errors=>{
            console.log(errors);
        })

    }

    handleUpdate(e){

        if(this.state.idToUpdate == ''){
            return false;
        }
        
        axios.post('/updatenews', {
            "title" : this.state.title,
            "body" : this.state.body,
            "id" : this.state.idToUpdate
        }).then(response=>{

            this.setState({
                news:response.data,
                title: '',
                body: '',
                idToUpdate : ''
            });

        }).catch(errors=>{
            console.log(errors);
        })
    }

    handleDelete(id){
        axios.post('/deletenews', {
            "id" : id
        }).then(response=>{
            // console.log(response.data)
            this.setState({news:response.data});

        }).catch(errors=>{
            console.log(errors);
        })
    }

    handleEdit(data){
        this.setState({
            title: data.title,
            body: data.body,
            'idToUpdate': data.id
        });
    }

    componentDidMount(){
        axios.get('/news').then(response=>{
            this.setState({news:response.data});

        }).catch(errors=>{
            console.log(errors);
        })
    }
 
    

    render() {
        const divStyle = {
            padding: 30
        };

        const divItem = {
            padding: 20,
            borderTop: 1,
            borderTopColor: '#e2e2e2',
            borderTopStyle: 'solid'
            
        }
        return (
            
            <div className="container" style={divStyle}>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header"><h2>My News List</h2></div>

                            <div className="card-body">
                                <form>
                                    <label>Title</label><br/>
                                    <input className="form-control" onChange={this.handleTitle} value={this.state.title} />
                                    <br/>
                                    <label>Body</label><br/>
                                    <textarea className="form-control" onChange={this.handleBody}  value={this.state.body}></textarea>
                                    <br/>
                                    <button type="button" onClick={this.handleSave} className="btn btn-primary">Add News</button>
                                    <button type="button" onClick={this.handleUpdate} className="btn btn-success float-right">Update</button>
                                </form>
                                <br/>
                                {
                                    this.state.news.map(data => 
                                        <div className="animated fadeIn" key={data.id} style={divItem}>
                                            <h3> {data.title}</h3>
                                            <p>{data.body}</p>
                                            <button  className="btn btn-danger" onClick={()=> this.handleDelete(data.id)}>Delete</button>
                                            <button  className="btn btn-secondary ml-2" onClick={()=> this.handleEdit(data)}>Edit</button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<Index />, document.getElementById('root'));
}
