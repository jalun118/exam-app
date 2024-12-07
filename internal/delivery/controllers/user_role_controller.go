package controllers

import (
	"context"
	"net/http"
	"strconv"
	"strings"
	"time"
	"ujian-app/internal/constants"
	"ujian-app/internal/helpers"
	"ujian-app/internal/models"
	"ujian-app/internal/response"
	"ujian-app/internal/usecase"

	"github.com/gin-gonic/gin"
)

type UserRoleController struct {
	userRoleUsecase *usecase.UserRoleUsecase
	validator       *helpers.Validation
}

func NewUserRoleController(userRoleUsecase *usecase.UserRoleUsecase, validator *helpers.Validation) *UserRoleController {
	return &UserRoleController{
		userRoleUsecase: userRoleUsecase,
		validator:       validator,
	}
}

type errCreateRole struct {
	NameRole int `json:"name_role"`
	Tiers    int `json:"tiers"`
}

func (ctrl *UserRoleController) CreateRole(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var req models.CreateRole

	if err := c.ShouldBindJSON(&req); err != nil {
		response.NewResponseError(c, response.ResponseError{
			Data:    nil,
			Code:    http.StatusBadRequest,
			Message: constants.UnsupportedContentType,
			Errors:  nil,
		})
		return
	}

	errRes := errCreateRole{
		NameRole: 0,
		Tiers:    0,
	}

	if errorType := ctrl.validator.Struct(req); errorType != nil || len(errorType) != 0 {
		errRes.NameRole = helpers.FilterTagCode(errorType, "NameRole")
		errRes.Tiers = helpers.FilterTagCode(errorType, "Tiers")

		response.NewResponseError(c, response.ResponseError{
			Data:    nil,
			Code:    http.StatusBadRequest,
			Message: constants.NotCompleteForm,
			Errors:  errRes,
		})
		return
	}

	var httpCode int = http.StatusCreated

	data, resNum := ctrl.userRoleUsecase.CreateNewRole(ctx, req.NameRole, req.Tiers)
	if resNum != constants.SuccessInsert {
		switch resNum {
		case constants.NotCompleteForm:
			httpCode = http.StatusBadRequest
		case constants.DuplicateRecord:
			httpCode = http.StatusContinue
		case constants.DatabaseError:
			httpCode = http.StatusInternalServerError
		}

		response.NewResponseError(c, response.ResponseError{
			Data:    nil,
			Code:    httpCode,
			Message: resNum,
			Errors:  nil,
		})
		return
	}

	response.NewResponseError(c, response.ResponseError{
		Data:    data,
		Code:    httpCode,
		Message: resNum,
		Errors:  nil,
	})
}

type errUpdateUserRole struct {
	NameRole int `json:"name_role"`
	Tiers    int `json:"tiers"`
}

func (ctrl *UserRoleController) Update(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	pId := c.Param("id")
	Id, err := strconv.Atoi(pId)
	if err != nil {
		response.NewResponseError(c, response.ResponseError{
			Data:    nil,
			Code:    http.StatusNotFound,
			Errors:  nil,
			Message: constants.RecordNotFound,
		})
		return
	}

	var req models.UpdatedRole

	if err := c.ShouldBindJSON(&req); err != nil {
		response.NewResponseError(c, response.ResponseError{
			Data:    nil,
			Code:    http.StatusBadRequest,
			Errors:  nil,
			Message: constants.UnsupportedContentType,
		})
		return
	}

	errRes := errUpdateUserRole{
		NameRole: 0,
		Tiers:    0,
	}

	if errType := ctrl.validator.Struct(req); errType != nil || len(errType) != 0 {
		errRes.NameRole = helpers.FilterTagCode(errType, "NameRole")
		errRes.Tiers = helpers.FilterTagCode(errType, "Tiers")

		response.NewResponseError(c, response.ResponseError{
			Data:    nil,
			Code:    http.StatusBadRequest,
			Errors:  errRes,
			Message: constants.NotCompleteForm,
		})
		return
	}

	var httpCode int = http.StatusOK

	data, resNum := ctrl.userRoleUsecase.UpdateRole(ctx, uint(Id), req.NameRole, req.Tiers)
	if resNum != constants.SuccessUpdate {
		switch resNum {
		case constants.NotCompleteForm:
			httpCode = http.StatusBadRequest
		case constants.RecordNotFound:
			httpCode = http.StatusNotFound
		case constants.DatabaseError:
			httpCode = http.StatusInternalServerError
		}

		response.NewResponseError(c, response.ResponseError{
			Data:    nil,
			Code:    httpCode,
			Message: resNum,
			Errors:  nil,
		})
		return
	}

	response.NewResponseError(c, response.ResponseError{
		Data:    data,
		Code:    httpCode,
		Message: resNum,
		Errors:  nil,
	})
}

func (ctrl *UserRoleController) GetAllPagination(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	limit := 20
	if val, err := strconv.Atoi(c.Query("limit")); err == nil {
		if val <= 100 || val >= 1 {
			limit = val
		}
	}

	page := 1
	if val, err := strconv.Atoi(c.Query("page")); err == nil {
		if val > 1 {
			page = val
		}
	}

	sort := constants.ASC
	if qSort := c.Query("sort"); qSort != "" {
		if helpers.ValidationSort(qSort) {
			sort = strings.ToLower(qSort)
		}
	}

	qSortBy := c.Query("order")
	if !helpers.ValidationAlpaNumberSpecial(qSortBy) {
		qSortBy = ""
	}

	data, meta, resNum := ctrl.userRoleUsecase.GetAllPagination(ctx, limit, page, sort, qSortBy)
	if resNum != constants.SuccessRead {
		response.NewResponseMeta(c, response.ResponseMeta{
			Data:    nil,
			Code:    http.StatusInternalServerError,
			Message: resNum,
			Meta: response.MetaData{
				CurrentPage: page + 1,
				TotalPage:   0,
				TotalData:   0,
			},
		})
		return
	}

	response.NewResponseMeta(c, response.ResponseMeta{
		Data:    data,
		Code:    http.StatusOK,
		Message: resNum,
		Meta: response.MetaData{
			CurrentPage: page + 1,
			TotalPage:   meta.TotalPages,
			TotalData:   len(data),
		},
	})
}

func (ctrl *UserRoleController) GetAll(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	data, resNum := ctrl.userRoleUsecase.GetAll(ctx)
	if resNum != constants.SuccessRead {
		response.NewResponse(c, response.Response{
			Data:    nil,
			Code:    http.StatusInternalServerError,
			Message: resNum,
		})
		return
	}

	response.NewResponse(c, response.Response{
		Data:    data,
		Code:    http.StatusOK,
		Message: resNum,
	})
}

func (ctrl *UserRoleController) GetOne(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	Id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		response.NewResponse(c, response.Response{
			Data:    nil,
			Code:    http.StatusNotFound,
			Message: constants.RecordNotFound,
		})
		return
	}

	httpCode := http.StatusOK

	data, resNum := ctrl.userRoleUsecase.GetOne(ctx, uint(Id))
	if resNum != constants.SuccessRead {
		switch resNum {
		case constants.RecordNotFound:
			httpCode = http.StatusNotFound
		case constants.DatabaseError:
			httpCode = http.StatusInternalServerError
		}

		response.NewResponse(c, response.Response{
			Data:    nil,
			Code:    httpCode,
			Message: resNum,
		})
		return
	}

	response.NewResponse(c, response.Response{
		Data:    data,
		Code:    httpCode,
		Message: resNum,
	})
}

func (ctrl *UserRoleController) DeleteOne(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	Id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		response.NewResponse(c, response.Response{
			Data:    nil,
			Code:    http.StatusNotFound,
			Message: constants.RecordNotFound,
		})
		return
	}

	httpCode := http.StatusOK

	resNum := ctrl.userRoleUsecase.Delete(ctx, uint(Id))
	if resNum != constants.SuccessDelete {
		switch resNum {
		case constants.RecordNotFound:
			httpCode = http.StatusNotFound
		case constants.DatabaseError:
			httpCode = http.StatusInternalServerError
		}

		response.NewResponse(c, response.Response{
			Data:    nil,
			Code:    httpCode,
			Message: resNum,
		})
		return
	}

	response.NewResponse(c, response.Response{
		Data:    nil,
		Code:    httpCode,
		Message: resNum,
	})
}
