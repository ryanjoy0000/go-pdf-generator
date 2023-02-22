package main

import (
	// "fmt"
	// "io/ioutil"
	"log"
	"net/http"

	
)

const(
	webPort = ":8080"
)

type Config struct{}

func main(){
	var app Config

	// set logging
	log.SetFlags(log.Lshortfile)

	// set up a web server
	log.Println("Starting pdf service on port", webPort)

	// define server
	srv := &http.Server{
		Addr: webPort,
		Handler: app.routes(),
	}

	// start the server
	err:= srv.ListenAndServe()
	app.handleErr(err, "err while starting server")
}



func (c *Config)handleErr(err error, msg string){
	if err != nil{
		log.Panic(msg, ":", err)
	}
}