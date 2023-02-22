package main

import (
	"fmt"
	"io/ioutil"
	"log"

	"github.com/go-pdf/fpdf"
)

func main(){
	bSlice, err := ioutil.ReadFile("input/sample.txt")
	handleErr(err, "error while reading from txt file")
	msg:= string(bSlice)
	err = generatePdf(msg)
	handleErr(err, "error while generating pdf file")
	fmt.Println("pdf file generated")
}

func generatePdf(inputStr string) error {
	fPdf := fpdf.New("P", "mm", "A4", "")
	fPdf.AddPage()
	fPdf.SetFont("Times", "", 12)
	fPdf.MultiCell(190, 5, inputStr, "0", "0", false)
	err := fPdf.OutputFileAndClose("output/final.pdf")
	return err
}

func handleErr(err error,msg string){
	if err != nil{
		log.Panic(msg, ":", err)
	}
}