package br.com.taskmanager.Exception;

import org.springframework.http.HttpStatus;

public class ApiException  extends RuntimeException{
    private static final long serialVersionUID = -1450961547062563771L;
    private final HttpStatus status;

    public ApiException(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return this.status;
    }
}
