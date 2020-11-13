import React, { useState, useEffect } from "react";
import SaveBtn from "../components/SaveBtn";
import Jumbotron from "../components/Jumbotron";
import axios from "axios";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  const [title, setTitle] = useState({})

  // Load all books and store them with setBooks
  // useEffect(() => {
  //   loadBooks()
  // }, [])

  // Loads all books and sets them to books
  function loadBooks() {
    axios.get("")
      .then(res => 
        setBooks(res.data)
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  function saveBook(book) {
    console.log(book)
    axios.post("/api/saveBook")
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setTitle(value)
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(title);
    axios.get("https://www.googleapis.com/books/v1/volumes?q="+title)
    .then(response => {
      console.log(response);
      const bookArray = response.data.items
      let bookInfo = []
      for (let i = 0; i < bookArray.length; i++) {
        let book = {
          title:bookArray[i].volumeInfo.title,
          authors:bookArray[i].volumeInfo.authors,
          description:bookArray[i].volumeInfo.description,
          // image:bookArray[i].volumeInfo.imageLinks.thumbnail || "",
          link:bookArray[i].volumeInfo.infoLink
        }
        bookInfo.push(book)
      }
      setBooks(bookInfo)
      console.log(books, bookInfo)
    })
  };

    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Search for a Book</h1>
            </Jumbotron>
            <form>
              <Input
                onChange={handleInputChange}
                name="title"
                placeholder="Search Book Title"
              />
              <FormBtn
                onClick={handleFormSubmit}
              >
                Search Book
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {books.length ? (
              <List>
                {books.map((book, key) => (
                  <ListItem key={key}
                        title = {book.title} 
                        authors = {book.authors}
                        description = {book.description}
                        link = {book.link} >
                    <SaveBtn onClick={() => saveBook(book)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }


export default Books;
