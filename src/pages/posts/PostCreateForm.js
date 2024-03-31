import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import btnStyles from "../../styles/Button.module.css";

import Asset from "../../components/Asset";
import Upload from "../../assets/upload.png";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefault";

function PostCreateForm() {
  const [errors, setErrors] = useState({});
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
  });
  const { title, content, image } = postData;

  const imageInput = useRef(null);
  const history = useHistory();

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      const selectedImage = event.target.files[0];
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(selectedImage),
        isImageSelected: true,
      });
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", imageInput.current.files[0]);

    try {
      const { data } = await axiosReq.post('/posts/', formData);
      history.push(`/posts/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container className="d-flex flex-column align-items-center justify-content-center">
            <Form.Group className="text-center">
              {image ? (
                <Image src={image} rounded className="img-fluid" />
              ) : (
                <Asset src={Upload} message="Click or tap to upload an image" />
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.title?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group>
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                name="content"
                value={content}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.content?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Button
              className="btn btn-primary"
              onClick={() => history.goBack()}
            >
              cancel
            </Button>
            <Button className="btn btn-primary" type="submit">
              create
            </Button>
            <Form.Label
              className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
              htmlFor="image-upload"
            >
              {postData.isImageSelected ? "Change Image" : "Upload Image"}
            </Form.Label>

          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostCreateForm;
