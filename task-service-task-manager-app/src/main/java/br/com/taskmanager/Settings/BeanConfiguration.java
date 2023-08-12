package br.com.taskmanager.Settings;

import br.com.taskmanager.Repositories.Task.TaskRepository;
import br.com.taskmanager.domains.Task.Adatpters.TaskAdapter;
import br.com.taskmanager.domains.Task.Ports.In.ITaskInputPort;
import br.com.taskmanager.domains.Task.Ports.Out.ITaskOutputPort;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackageClasses = { TaskRepository.class})
public class BeanConfiguration {
    @Bean
    ITaskInputPort taskInputPort(ITaskOutputPort iTaskOutputPort) {
        return new TaskAdapter(iTaskOutputPort);
    }
}
