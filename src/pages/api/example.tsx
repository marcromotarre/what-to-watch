export default function handler(req: any, res: any) {
 
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
