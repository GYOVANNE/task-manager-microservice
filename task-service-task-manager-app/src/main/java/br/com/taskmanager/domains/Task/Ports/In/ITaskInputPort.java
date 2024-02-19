package br.com.taskmanager.domains.Task.Ports.In;

import java.util.List;

import br.com.taskmanager.domains.Task.DTO.CreateTaskRequestDTO;
import br.com.taskmanager.domains.Task.DTO.TaskDTO;

public interface ITaskInputPort {
    List<TaskDTO> index();

    void create(CreateTaskRequestDTO request);

    TaskDTO show(Long id);

    void update(Long id, CreateTaskRequestDTO request);

    void delete(Long id);
}
