package br.com.taskmanager.domains.Task.Ports.In;

import br.com.taskmanager.domains.Task.DTO.CreateTaskRequestDTO;
import br.com.taskmanager.domains.Task.DTO.TaskDTO;

import java.util.List;

public interface ITaskInputPort {
    List<TaskDTO> index();
    void create(CreateTaskRequestDTO request);
    TaskDTO show(Long id);
    void update(Long id, CreateTaskRequestDTO request);
    void delete(Long id);
}
