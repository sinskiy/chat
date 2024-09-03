import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import InputField from "../components/InputField";
import useFetch from "../hooks/useFetch";
import { FormEvent, useEffect } from "react";

export default function Signup() {
  const { data, error, isLoading, fetchData } = useFetch();

  const navigate = useNavigate();
  useEffect(() => {
    if (data && data.user) {
      return navigate("/login");
    }
  }, [data]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);
    fetchData("/auth/signup", {
      method: "post",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify({
        username: data.get("username"),
        password: data.get("password"),
      }),
    });
  }

  return (
    <div className="centered-section">
      <h1>sign up</h1>
      <Form isLoading={isLoading} method="post" onSubmit={handleSubmit}>
        {error && <p aria-live="polite">{error}</p>}
        <InputField
          label="username"
          required
          minLength={1}
          maxLength={30}
          autoComplete="username"
        />
        <InputField
          label="password"
          type="password"
          required
          minLength={1}
          maxLength={255}
          autoComplete="current-password"
        />
      </Form>
    </div>
  );
}
