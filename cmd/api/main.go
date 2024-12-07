package main

import (
	"os"
	"strings"
	"ujian-app/internal/app"
	"ujian-app/internal/loggers"

	"github.com/gin-contrib/gzip"
	"github.com/gin-gonic/gin"
)

// func openLogFile(path string) (*os.File, error) {
// 	logFile, err := os.OpenFile(path, os.O_WRONLY|os.O_APPEND|os.O_CREATE, 0644)
// 	if err != nil {
// 		return nil, err
// 	}
// 	return logFile, nil
// }

func setUpEngine(log *loggers.Logger) *gin.Engine {
	gin.SetMode(os.Getenv("GIN_MODE"))

	log.Info("engine mode: [%s]", strings.ToUpper(gin.Mode()))

	r := gin.New()
	log.Info("setup router...")

	r.MaxMultipartMemory = 32 << 20
	log.Info("set max multipart memory...")

	r.Use(gin.Recovery())
	r.Use(gzip.Gzip(gzip.DefaultCompression))
	return r
}

func main() {
	viper := app.NewViper()

	logger := loggers.New(os.Stdout)

	engine := setUpEngine(logger)

	db := app.NewDatabase(viper)

	app.AppBootstrap(&app.BootstrapConfig{
		App: engine,
		DB:  db,
		Log: logger,
	})

	PORT := viper.GetString("PORT")
	engine.Run(":" + PORT)
}
