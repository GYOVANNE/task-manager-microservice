package br.com.taskmanager.Controllers.Task;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.taskmanager.Services.Task.TaskService;
import br.com.taskmanager.Util.ResponseSuccess;
import br.com.taskmanager.domains.Task.DTO.CreateTaskRequestDTO;
import br.com.taskmanager.domains.Task.DTO.TaskDTO;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TaskController {
    @Autowired
    private TaskService service;

    /**
     * List all tasks
     * 
     * @return List<Task>
     */
    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<TaskDTO> index() {
        return this.service.index();
    }

    /**
     * Get one task
     * 
     * @return List<Task>
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public TaskDTO show(@PathVariable Long id) {
        return this.service.show(id);
    }

    /**
     * Create one task
     */
    @RequestMapping(value = "", method = RequestMethod.POST)
    @Transactional
    public ResponseEntity<ResponseSuccess> create(@RequestBody CreateTaskRequestDTO request) {
        System.out.println(request);
        return this.service.create(request);
    }

    /**
     * Update one task
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    @Transactional
    public ResponseEntity<ResponseSuccess> update(@PathVariable Long id, @RequestBody CreateTaskRequestDTO request) {
        return this.service.update(id, request);
    }

    /**
     * Delete one task
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @Transactional
    public ResponseEntity<ResponseSuccess> delete(@PathVariable Long id) {
        return this.service.delete(id);
    }
}
