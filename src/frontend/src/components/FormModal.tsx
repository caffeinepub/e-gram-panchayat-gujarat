import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Printer, X } from "lucide-react";
import { useState } from "react";
import type { SeedForm } from "../data/forms";

interface Props {
  form: SeedForm | null;
  open: boolean;
  onClose: () => void;
}

export default function FormModal({ form, open, onClose }: Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!form) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handlePrint = () => {
    const printContent = generatePrintHTML(form, values);
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(printContent);
      win.document.close();
      win.focus();
      win.print();
    }
  };

  const handleClose = () => {
    setValues({});
    setSubmitted(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-lg max-h-[90vh] overflow-y-auto"
        data-ocid="form.modal"
      >
        <DialogHeader>
          <DialogTitle className="text-secondary">
            {form.titleGu}
            <div className="text-sm font-normal text-muted-foreground">
              {form.titleEn}
            </div>
          </DialogTitle>
        </DialogHeader>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {form.fields.map((field) => (
              <div key={field.label}>
                <Label className="text-sm font-medium">
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </Label>
                {field.type === "select" ? (
                  <Select
                    onValueChange={(v) =>
                      setValues((prev) => ({ ...prev, [field.label]: v }))
                    }
                    required={field.required}
                  >
                    <SelectTrigger data-ocid="form.field.select">
                      <SelectValue placeholder="પસંદ કરો..." />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    type={field.type === "number" ? "tel" : field.type}
                    required={field.required}
                    value={values[field.label] || ""}
                    onChange={(e) =>
                      setValues((prev) => ({
                        ...prev,
                        [field.label]: e.target.value,
                      }))
                    }
                    data-ocid="form.field.input"
                    className="mt-1"
                  />
                )}
              </div>
            ))}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                data-ocid="form.cancel.button"
              >
                રદ / Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary text-white"
                data-ocid="form.submit.button"
              >
                સબ્મિટ / Submit
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-3xl">✅</span>
            </div>
            <div>
              <h3 className="font-bold text-secondary text-lg">
                ફોર્મ સફળતાથી ભરાયો!
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                PDF ડાઉનલોડ કરવા નીચે બટન દબાવો
              </p>
            </div>
            <div className="bg-brand-cream rounded-lg p-3 text-sm text-left">
              <div className="font-semibold mb-2">ભરેલી માહિતી:</div>
              {Object.entries(values).map(([k, v]) =>
                v ? (
                  <div key={k} className="flex gap-2 text-xs py-0.5">
                    <span className="text-muted-foreground w-40 shrink-0">
                      {k}:
                    </span>
                    <span className="font-medium">{v}</span>
                  </div>
                ) : null,
              )}
            </div>
            <div className="flex gap-2 justify-center">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                data-ocid="form.close.button"
              >
                <X className="w-4 h-4 mr-1" /> બંધ કરો
              </Button>
              <Button
                type="button"
                onClick={handlePrint}
                className="bg-primary text-white"
                data-ocid="form.print.button"
              >
                <Printer className="w-4 h-4 mr-1" /> PDF / પ્રિંટ
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function generatePrintHTML(
  form: SeedForm,
  values: Record<string, string>,
): string {
  const rows = Object.entries(values)
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px;border:1px solid #ccc;background:#f9f5ea;font-weight:600;width:40%">${k}</td><td style="padding:8px;border:1px solid #ccc">${v}</td></tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${form.titleEn} - e Gram Panchayat Gujarat</title>
<style>
  body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
  .header { background: linear-gradient(90deg, #C85B14, #D26A1C); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
  .header h1 { margin: 0; font-size: 20px; }
  .header h2 { margin: 5px 0 0; font-size: 14px; opacity: 0.9; }
  .subheader { background: #0D2E57; color: white; padding: 10px 20px; text-align: center; }
  .content { border: 1px solid #ccc; border-top: none; padding: 20px; }
  table { width: 100%; border-collapse: collapse; margin-top: 10px; }
  .form-title { font-size: 18px; font-weight: bold; color: #0D2E57; margin-bottom: 15px; border-bottom: 2px solid #C85B14; padding-bottom: 8px; }
  .footer-print { margin-top: 20px; padding-top: 15px; border-top: 1px solid #ccc; text-align: center; font-size: 11px; color: #666; }
  @media print { body { padding: 0; } }
</style>
</head>
<body>
  <div class="header">
    <h1>e GRAM PANCHAYAT GUJARAT</h1>
    <h2>Online Service Centre</h2>
  </div>
  <div class="subheader">Moti Dugdol, Ta. Dhanera, Dist. Banaskantha, Gujarat</div>
  <div class="content">
    <div class="form-title">${form.titleEn} / ${form.titleGu}</div>
    <table>${rows}</table>
    <div class="footer-print">
      <p>સંપર્ક / Contact: 7874785814 | cscservicedugdolgp@gmail.com</p>
      <p>તારીખ / Date: ${new Date().toLocaleDateString("en-IN")}</p>
      <p>This is a computer generated document.</p>
    </div>
  </div>
</body>
</html>`;
}
