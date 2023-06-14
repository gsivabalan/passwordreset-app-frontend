
import React, { useState } from "react";
import { Button, Form, Input, Link } from "react-bootstrap";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [randomString, setRandomString] = useState("");
  const [expiryDate, setExpiryDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = getUserByEmail(email);
    if (!user) {
      alert("User not found!");
      return;
    }
    const randomString = generateRandomString();
    setRandomString(randomString);
    const expiryDate = new Date().getTime() + 1000 * 60 * 60 * 24; 
    setExpiryDate(expiryDate);

    sendEmail(user.email, randomString, expiryDate);

    setEmail("");
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit">Reset Password</Button>
      </Form>
    </div>
  );
};

export default ForgotPassword;


