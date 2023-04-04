export default function handler(req, res) {
 
  if (req.method == "POST") {
    console.log(req);
  }
  if (req.method == "GET") {
  }

  console.log("superIn");
  res.status(200).json({
    next: "",
    results: [],
  });
}
