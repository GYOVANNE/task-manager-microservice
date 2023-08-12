package br.com.taskmanager.Services.Task;

import br.com.taskmanager.Exception.ApiException;
import br.com.taskmanager.Util.ResponseSuccess;
import br.com.taskmanager.Util.StatusType;
import br.com.taskmanager.domains.Task.DTO.CreateTaskRequestDTO;
import br.com.taskmanager.domains.Task.DTO.TaskDTO;
import br.com.taskmanager.domains.Task.Ports.In.ITaskInputPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class TaskService {
    private final ITaskInputPort input;

    public TaskService(ITaskInputPort input) {
        this.input = input;
    }

    public List<TaskDTO> index() {
        try {
            return this.input.index();
        } catch (Exception e) {
            throw new ApiException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    public ResponseEntity<ResponseSuccess> create(CreateTaskRequestDTO request){
        try {
            this.input.create(request);
            return new ResponseEntity<>(new ResponseSuccess(StatusType.CREATED),HttpStatus.CREATED);
        } catch (Exception e) {
            throw new ApiException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    public TaskDTO show(Long id){
        try {
            return this.input.show(id);
        } catch (Exception e) {
            throw new ApiException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    public ResponseEntity<ResponseSuccess> update(Long id, CreateTaskRequestDTO request){
        try {
            this.input.update(id, request);
            return new ResponseEntity<>(new ResponseSuccess(StatusType.UPDATED),HttpStatus.OK);
        } catch (Exception e) {
            throw new ApiException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    public ResponseEntity<ResponseSuccess> delete(Long id){
        try {
            this.input.delete(id);
            return new ResponseEntity<>(new ResponseSuccess(StatusType.DELETED),HttpStatus.OK);
        } catch (Exception e) {
            throw new ApiException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
}
