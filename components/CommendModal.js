import { IMAGELINK, MAIN } from "@/globals/endpoints";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../public/styles/style.css";
import { timeAgo } from "@/globals/timeFormatter";
import axios from "axios";
import {
  ERROR_MESSAGE,
  EXCEPTION_ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from "@/globals/swal";

const CommentModal = ({ comments, show, onClose, userid, post_id }) => {
  const [newComment, setNewComment] = useState("");

  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };

  console.log(post_id);

  const submitComment = async () => {
    if (!newComment.trim()) return;

    const formData = new FormData();
    formData.append("operation", "insertComment");
    formData.append(
      "json",
      JSON.stringify({
        user_id: userid,
        post_id: post_id,
        comment: newComment,
      })
    );

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    try {
      const response = await axios({
        url: MAIN,
        method: "POST",
        data: formData,
      });

      if (response.status === 200) {
        if (response.data !== null && response.data.success) {
          SUCCESS_MESSAGE("Success", "Comment Sent");
        } else {
          ERROR_MESSAGE(
            "Error submitting comment:",
            JSON.stringify(response.data)
          );
        }
      } else {
        ERROR_MESSAGE("Status Error:", response.status);
      }
    } catch (error) {
      EXCEPTION_ERROR_MESSAGE(`${error}`);
    }
  };

  const handleCommentSubmit = () => {
    submitComment();
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header>
        <Modal.Title>Comments</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="newComment" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button
          variant="primary"
          onClick={handleCommentSubmit}
          disabled={!newComment.trim()}
        >
          Post Comment
        </Button>

        {comments.length > 0 ? (
          comments.map((comment) => (
            <div className="card mt-3" key={comment.cid}>
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <img
                      src={IMAGELINK + comment.user_image}
                      className="rounded-circle"
                      height={60}
                      width={60}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="col">
                    <h6 className="mb-2">
                      <span>@{comment.username}</span> ·{" "}
                      <span style={{ color: "gray" }}>
                        {timeAgo(comment.commentd_at)}
                      </span>
                    </h6>
                    <p className="mb-0">{comment.comment}</p>
                    {/* <button className="btn mt-3">
                      <i className="fas fa-heart" />
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No comments available.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CommentModal;
