import { register } from "../../shared/hub";
import { PdfEditorTool } from "./PdfEditorTool";
import "./styles.css";

register("pdf-editor", { Tool: PdfEditorTool });
