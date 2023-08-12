package br.com.taskmanager.domains.Task.Ports.Out;

import br.com.taskmanager.domains.Task.DTO.CreateTaskRequestDTO;
import br.com.taskmanager.domains.Task.Entity.Task;

import java.util.List;

public interface ITaskOutputPort {
    List<Task> index();
    void create(Task request);
    Task show(Long id);
    void update(Long id, Task request);
    void delete(Long id);
}
