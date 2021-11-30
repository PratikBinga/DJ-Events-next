import { API_URL } from "@/config/index";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "POST") {
    const { identifier, password } = req.body;
    const strapiRes = await fetch(`${API_URL}/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await strapiRes.json();
    console.log(data.jwt, "JWT token");

    if (strapiRes.ok) {
      // set the http cookie : todo
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: "strict",
          path: "/",
        })
      );
      console.log(data, "data in API next success");
      res.status(200).json({ user: data.user });
    } else {
      console.log(data, "data in API next eror");
      res
        .status(data.statusCode)
        .json({ message: data.message[0].messages[0].message });
    }

    console.log(req.body);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
