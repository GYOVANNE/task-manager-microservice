package br.com.taskmanager.Controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class HealthCheckController {

    /**
     * Show all templates forms
     * @return List
     */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public String index() {
        return "Pongs";
    }
}
