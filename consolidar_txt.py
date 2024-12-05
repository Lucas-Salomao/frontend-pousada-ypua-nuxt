import os

def consolidate_vue_files(directory_path, output_file='vue_files_consolidated.txt'):
    """
    Varre todos os arquivos .vue em um diretório e os consolida em um único arquivo de texto.
    
    Args:
        directory_path (str): Caminho do diretório para varrer
        output_file (str): Nome do arquivo de saída
    """
    # Abre o arquivo de saída para escrita
    with open(output_file, 'w', encoding='utf-8') as outfile:
        # Caminha por todas as pastas e subpastas
        for root, dirs, files in os.walk(directory_path):
            for file in files:
                # Verifica se o arquivo é .vue
                if file.endswith('.vue'):
                    # Caminho completo do arquivo
                    file_path = os.path.join(root, file)
                    
                    # Escreve o nome do arquivo como comentário
                    outfile.write(f"// Arquivo: {file_path}\n")
                    
                    # Lê e escreve o conteúdo do arquivo
                    try:
                        with open(file_path, 'r', encoding='utf-8') as vue_file:
                            outfile.write(vue_file.read())
                        
                        # Adiciona uma linha em branco entre arquivos
                        outfile.write("\n\n")
                    
                    except Exception as e:
                        print(f"Erro ao ler {file_path}: {e}")
    
    print(f"Arquivos .vue consolidados em {output_file}")

# Exemplo de uso
if __name__ == "__main__":
    # Substitua pelo caminho do seu diretório
    diretorio = "./pages/"
    consolidate_vue_files(diretorio)