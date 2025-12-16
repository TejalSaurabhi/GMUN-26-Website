import "./Input.css";

const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="form-input-parent">
      <div className="form-input">
        <Icon
          style={{
            width: "1.25rem",
            height: "1.25rem",
            color: "#0d7779ff",
          }}
        />
      </div>

      <input {...props} className="input-el"/>
    </div>
  );
};

export default Input;
