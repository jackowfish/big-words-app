import React, { useState } from 'react';
import Word from './Word'
import { getDatabase, ref, onValue } from "firebase/database";
import 'bulma/css/bulma.min.css';
import { propTypes } from 'react-bootstrap/esm/Image';
import Cookies from 'universal-cookie';
import { render } from 'react-dom';

class AllWords extends React.Component {
    constructor(props) {
        super();
        this.db = getDatabase();
        this.cookies = new Cookies();
        this.state = {
            books_array: [],
            words_array: [],
            word_count_array: [],
            components_array: [],
            child: props.child,
            sorted: "A_Z",
            loaded: false
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const books_array = [];
        const words_array = [];
        const word_count_array = [];
        const components_array = [];
        const db = getDatabase();
        const cookies = new Cookies();
        const child_book_list = ref(db, "Users/" +  cookies.get('BigWordsUser').user.uid + "/Children/" + nextProps.child + "/Books Read");
        onValue(child_book_list, (snapshot) => {
            for (var book in snapshot.val()) {
                books_array.push(book);
                const book_data = ref(db, "Books/" + book + "/Words");
                onValue(book_data, (snapshot) => {
                    for (var word in snapshot.val()) {
                        const word_data = ref(db, "Books/" + book + "/Words/" + word);
                        onValue(word_data, (snapshot) => {
                            const word_info = snapshot.val();
                            if (word_info !== null) {
                                if (words_array.includes(word.toLowerCase())) {
                                    var index = words_array.indexOf(word.toLowerCase());
                                    const current = word_count_array[index];
                                    var current_count = current[1];
                                    var new_count = current_count + word_info.count;
                                    word_count_array[index] = [word.toLowerCase(),new_count];
                                } else {
                                    words_array.push(word);
                                    word_count_array.push([word.toLowerCase(),word_info.count]);
                                }
                            }
                        })
                    }
                })
            }
        });

        if (prevState.sorted === "least") {
            const to_sort = word_count_array;
            to_sort.sort((a,b) => a[1] - b[1]);
            for (var i = 0; i < to_sort.length; i++) {
                const current = to_sort[i];
                components_array.push(<Word key={current[0] + "_" + current[1]} word={current[0]} count={current[1]}/>)
            }
        } else if (prevState.sorted === "most") {
            const to_sort = word_count_array;
            to_sort.sort((a,b) => b[1] - a[1]);
            for (var i = 0; i < to_sort.length; i++) {
                const current = to_sort[i];
                components_array.push(<Word key={current[0] + "_" + current[1]} word={current[0]} count={current[1]}/>)
            }
        } else if (prevState.sorted == "Z_A") {
            const to_sort = word_count_array;
            to_sort.sort(function(a,b) {
                if (a[0] > b[0]) {
                    return -1;
                } else if (a[0] < b[0]) {
                    return 1;
                } else {
                    return 0;
                }
            });
            for (var i = 0; i < to_sort.length; i++) {
                const current = to_sort[i];
                components_array.push(<Word key={current[0] + "_" + current[1]} word={current[0]} count={current[1]}/>)
            }
        } else {
            const to_sort = word_count_array;
            to_sort.sort(function(a,b) {
                if (a[0] < b[0]) {
                    return -1;
                } else if (a[0] > b[0]) {
                    return 1;
                } else {
                    return 0;
                }
            });
            for (var i = 0; i < to_sort.length; i++) {
                const current = to_sort[i];
                components_array.push(<Word key={current[0] + "_" + current[1]} word={current[0]} count={current[1]}/>)
            }
        }

        return {
            child: nextProps.child,
            books_array: books_array,
            words_array: words_array,
            word_count_array: word_count_array,
            components_array: components_array
        }
    }

    componentDidMount() {
        this.render_data();
    }
    
    render_data() {
        setTimeout(() => {
            this.setState({
                loaded: true
            })
        }, 50);
        this.sort_AZ();
    }


    sort_AZ = () => {
        let a_z_button = document.getElementById("a_z_button");
        let z_a_button = document.getElementById("z_a_button");
        let most_button = document.getElementById("most_button");
        let least_button = document.getElementById("least_button");
        a_z_button.style.backgroundColor = "#FF932F"
        z_a_button.style.backgroundColor = "white"
        most_button.style.backgroundColor = "white"
        least_button.style.backgroundColor = "white"

        this.setState({
            sorted: "A_Z"
        })

    }

    sort_ZA = () => {
        let a_z_button = document.getElementById("a_z_button");
        let z_a_button = document.getElementById("z_a_button");
        let most_button = document.getElementById("most_button");
        let least_button = document.getElementById("least_button");
        a_z_button.style.backgroundColor = "white";
        z_a_button.style.backgroundColor = "#FF932F";
        most_button.style.backgroundColor = "white";
        least_button.style.backgroundColor = "white";

        this.setState({
            sorted: "Z_A"
        })


    }

    sort_most = () => {
        let a_z_button = document.getElementById("a_z_button");
        let z_a_button = document.getElementById("z_a_button");
        let most_button = document.getElementById("most_button");
        let least_button = document.getElementById("least_button");
        a_z_button.style.backgroundColor = "white"
        z_a_button.style.backgroundColor = "white"
        most_button.style.backgroundColor = "#FF932F"
        least_button.style.backgroundColor = "white"

        this.setState({
            sorted: "most"
        })

    }

    sort_least = () => {
        let a_z_button = document.getElementById("a_z_button");
        let z_a_button = document.getElementById("z_a_button");
        let most_button = document.getElementById("most_button");
        let least_button = document.getElementById("least_button");
        a_z_button.style.backgroundColor = "white"
        z_a_button.style.backgroundColor = "white"
        most_button.style.backgroundColor = "white"
        least_button.style.backgroundColor = "#FF932F"

        this.setState({
            sorted: "least"
        })

    }
    
    render() {
        return (
        <div className="column allWords_section border">
            <h1 className="allwords_title">All Words</h1>
            <p>
                Sort by:
                    <button className="a_z_button" id="a_z_button" onClick={this.sort_AZ}>A-Z</button>
                    <button className="z_a_button" id="z_a_button" onClick={this.sort_ZA}>Z-A</button>
                    <button className="most_button" id="most_button" onClick={this.sort_most}>Most Heard</button>
                    <button className="least_button" id="least_button" onClick={this.sort_least}>Least Heard</button>
            </p> 
            <div className = "column allWords_list border">
                {this.state.loaded ? this.state.components_array : null}
            </div>
        </div>
        
        )
    }
    }
  
  export default AllWords;      