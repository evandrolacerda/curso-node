CREATE PROCEDURE dbo.inserir_tarefa @descricao nvarchar(100), @executada bit
as 
BEGIN
	INSERT INTO tarefas (descricao, executada, createdAt , updatedAt  ) VALUES( @descricao, @executada, GETDATE(), GETDATE() )
END
