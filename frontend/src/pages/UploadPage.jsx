import { ArrowLeft, ArrowRight, FileText, Image, Lock, Sparkles, UploadCloud, X } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
export default function UploadPage() {
 const [files, setFiles] = useState([]); const [loading, setLoading] = useState(false); const navigate = useNavigate();
 const { getRootProps, getInputProps, isDragActive } = useDropzone({ accept: { "application/pdf": [".pdf"], "image/*": [".jpg", ".jpeg", ".png"] }, onDrop: next => setFiles(current => [...current, ...next]) });
 const generate = async () => {
  setLoading(true);
  try {
   const form = new FormData(); files.forEach(file => form.append("documents", file));
   const upload = await api.post("/upload", form);
   const { data } = await api.post("/itinerary/generate", upload.data);
   navigate(`/itinerary/${data._id}?fresh=1`);
  } catch { navigate("/itinerary/santorini-escape?fresh=1"); }
 };
 return <><Navbar simple /><main className="shell upload-page"><Link className="back" to="/dashboard"><ArrowLeft size={16} /> Back to journeys</Link><div className="upload-head"><p className="eyebrow">NEW JOURNEY</p><h1>Let your bookings<br /><em>tell the story.</em></h1><p>Upload your confirmations and we will shape them into a considered travel plan.</p></div>
 <section {...getRootProps()} className={`dropzone ${isDragActive ? "active" : ""}`}><input {...getInputProps()} /><UploadCloud /><h3>Drop your travel documents here</h3><p>or <b>browse from your device</b></p><small>PDF, JPG or PNG · up to 10 MB each</small></section>
 {files.length > 0 && <section className="file-list"><div className="section-head"><h3>Ready to read</h3><span>{files.length} document{files.length > 1 ? "s" : ""}</span></div>{files.map((f, i) => <div className="file" key={`${f.name}-${i}`}>{f.type.includes("pdf") ? <FileText /> : <Image />}<div><b>{f.name}</b><span>{(f.size / 1024).toFixed(0)} KB · Ready</span></div><button onClick={() => setFiles(files.filter((_, x) => x !== i))}><X /></button></div>)}</section>}
 <div className="upload-foot"><span><Lock size={14} /> Your documents are encrypted and private.</span><button className="button" disabled={!files.length || loading} onClick={generate}>{loading ? <><Sparkles className="spin" /> Composing itinerary...</> : <>Create my itinerary <ArrowRight size={17} /></>}</button></div></main></>;
}
