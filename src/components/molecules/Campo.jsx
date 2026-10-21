import { Form } from "react-bootstrap";

function Campo(props) {
  return (
    <Form.Group className="mb-3">
      <Form.Label htmlFor={props.id}>{props.label}</Form.Label>

      {props.tipo == "select" ? (
        <Form.Select id={props.id} value={props.value} onChange={props.onChange}>
          {props.children}
        </Form.Select>
      ) : props.tipo == "textarea" ? (
        <Form.Control
          as="textarea"
          rows={3}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
        />
      ) : (
        <Form.Control
          type={props.tipo || "text"}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
        />
      )}
    </Form.Group>
  );
}

export default Campo;
