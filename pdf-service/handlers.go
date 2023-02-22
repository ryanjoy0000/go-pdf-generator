package main

import (
	"io"
	"log"
	"net/http"
	"os"

	"github.com/go-pdf/fpdf"
)

func (c *Config) fileToPdf(w http.ResponseWriter, r *http.Request){
	// read request body
	bSlice, err := io.ReadAll(r.Body)
	c.handleErr(err, "err while reading request body")
	msg:= string(bSlice)
	log.Println("reading req body:", string(bSlice))
	err = c.generatePdf(msg)
	c.handleErr(err, "error while generating pdf file")
	log.Println("pdf file generated")

	// close req body
	defer r.Body.Close()

}

func (c *Config) textToPdf(w http.ResponseWriter, r *http.Request){
	_, err := w.Write([]byte("textToPdf response"))
	c.handleErr(err, "err in textToPdf")
}

func (c *Config)generatePdf(inputStr string) error {
	fPdf := fpdf.New("P", "mm", "A4", "")
	fPdf.AddPage()
	fPdf.SetFont("Times", "", 12)
	fPdf.MultiCell(190, 5, inputStr, "0", "0", false)
	err := fPdf.OutputFileAndClose("./app/download/final.pdf")
	return err
}


func (c *Config) download(w http.ResponseWriter, r *http.Request){
	log.Println("Received download request")
	file, err := os.Open("./app/download/final.pdf")
	c.handleErr(err, "error while opening pdf file")
	defer file.Close()
	w.Header().Set("Content-Disposition", "attachment; filename=final.pdf")
	w.Header().Set("Content-Type", "application/octet-stream")
	io.Copy(w, file)
}
