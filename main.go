package main

import (
	"fmt"
	"os"
)

type AnswerOption struct {
	Index  int
	Option string
}

type QuestionExam struct {
	Question     string
	Index        int
	AnswerOption []AnswerOption
}

func main() {

	result, err := os.ReadFile("./xxx.json")
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println(string(result))

	exam := []QuestionExam{
		{
			Question: "mantap jiwo",
			Index:    0,
			AnswerOption: []AnswerOption{
				{
					Index:  0,
					Option: "mantap 1",
				},
				{
					Index:  1,
					Option: "mantap 2",
				},
			},
		},
		{
			Question: "mantap jiwo",
			Index:    0,
			AnswerOption: []AnswerOption{
				{
					Index:  0,
					Option: "mantap 1",
				},
				{
					Index:  1,
					Option: "mantap 2",
				},
			},
		},
		{
			Question: "mantap jiwo",
			Index:    0,
			AnswerOption: []AnswerOption{
				{
					Index:  0,
					Option: "mantap 1",
				},
				{
					Index:  1,
					Option: "mantap 2",
				},
			},
		},
	}

	fmt.Println(exam)
}
