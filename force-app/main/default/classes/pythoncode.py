import math
import random

class ConnectFour:
    def __init__(self):
        self.rows = 6
        self.cols = 7
        self.board = [[0 for _ in range(self.cols)] for _ in range(self.rows)]
        self.human_piece = 1
        self.ai_piece = 2
        self.empty = 0
        
    def print_board(self):
        """Display the current board state"""
        print("\n" + "="*29)
        print("  1   2   3   4   5   6   7")
        print("="*29)
        
        for row in range(self.rows):
            print("|", end="")
            for col in range(self.cols):
                if self.board[row][col] == 0:
                    print("   |", end="")
                elif self.board[row][col] == 1:
                    print(" X |", end="")
                else:
                    print(" O |", end="")
            print()
        print("="*29)
    
    def is_valid_location(self, col):
        """Check if a column has space for a new piece"""
        return self.board[0][col] == 0
    
    def get_next_open_row(self, col):
        """Find the lowest available row in a column"""
        for r in range(self.rows-1, -1, -1):
            if self.board[r][col] == 0:
                return r
    
    def drop_piece(self, row, col, piece):
        """Place a piece on the board"""
        self.board[row][col] = piece
    
    def winning_move(self, piece):
        """Check if the current piece has won the game"""
        # Check horizontal locations
        for c in range(self.cols-3):
            for r in range(self.rows):
                if (self.board[r][c] == piece and self.board[r][c+1] == piece and 
                    self.board[r][c+2] == piece and self.board[r][c+3] == piece):
                    return True
        
        # Check vertical locations
        for c in range(self.cols):
            for r in range(self.rows-3):
                if (self.board[r][c] == piece and self.board[r+1][c] == piece and 
                    self.board[r+2][c] == piece and self.board[r+3][c] == piece):
                    return True
        
        # Check positively sloped diagonals
        for c in range(self.cols-3):
            for r in range(self.rows-3):
                if (self.board[r][c] == piece and self.board[r+1][c+1] == piece and 
                    self.board[r+2][c+2] == piece and self.board[r+3][c+3] == piece):
                    return True
        
        # Check negatively sloped diagonals
        for c in range(self.cols-3):
            for r in range(3, self.rows):
                if (self.board[r][c] == piece and self.board[r-1][c+1] == piece and 
                    self.board[r-2][c+2] == piece and self.board[r-3][c+3] == piece):
                    return True
        
        return False
    
    def evaluate_window(self, window, piece):
        """Evaluate a window of 4 positions for scoring"""
        score = 0
        opp_piece = self.human_piece if piece == self.ai_piece else self.ai_piece
        
        if window.count(piece) == 4:
            score += 100
        elif window.count(piece) == 3 and window.count(self.empty) == 1:
            score += 10
        elif window.count(piece) == 2 and window.count(self.empty) == 2:
            score += 2
        
        if window.count(opp_piece) == 3 and window.count(self.empty) == 1:
            score -= 80
        
        return score
    
    def score_position(self, piece):
        """Static evaluation function for board position"""
        score = 0
        
        # Score center column (most strategic)
        center_array = [self.board[i][self.cols//2] for i in range(self.rows)]
        center_count = center_array.count(piece)
        score += center_count * 4
        
        # Score horizontal
        for r in range(self.rows):
            row_array = [self.board[r][c] for c in range(self.cols)]
            for c in range(self.cols-3):
                window = row_array[c:c+4]
                score += self.evaluate_window(window, piece)
        
        # Score vertical
        for c in range(self.cols):
            col_array = [self.board[r][c] for r in range(self.rows)]
            for r in range(self.rows-3):
                window = col_array[r:r+4]
                score += self.evaluate_window(window, piece)
        
        # Score positive sloped diagonal
        for r in range(self.rows-3):
            for c in range(self.cols-3):
                window = [self.board[r+i][c+i] for i in range(4)]
                score += self.evaluate_window(window, piece)
        
        # Score negative sloped diagonal
        for r in range(self.rows-3):
            for c in range(self.cols-3):
                window = [self.board[r+3-i][c+i] for i in range(4)]
                score += self.evaluate_window(window, piece)
        
        return score
    
    def is_terminal_node(self):
        """Check if the game has ended"""
        return (self.winning_move(self.human_piece) or 
                self.winning_move(self.ai_piece) or 
                len(self.get_valid_locations()) == 0)
    
    def get_valid_locations(self):
        """Get all valid columns for moves"""
        valid_locations = []
        for col in range(self.cols):
            if self.is_valid_location(col):
                valid_locations.append(col)
        return valid_locations
    
    def minimax(self, depth, alpha, beta, maximizing_player):
        """Minimax algorithm with alpha-beta pruning"""
        valid_locations = self.get_valid_locations()
        is_terminal = self.is_terminal_node()
        
        if depth == 0 or is_terminal:
            if is_terminal:
                if self.winning_move(self.ai_piece):
                    return (None, 100000000000000)
                elif self.winning_move(self.human_piece):
                    return (None, -10000000000000)
                else:
                    return (None, 0)
            else:
                return (None, self.score_position(self.ai_piece))
        
        if maximizing_player:
            value = -math.inf
            column = random.choice(valid_locations)
            for col in valid_locations:
                row = self.get_next_open_row(col)
                temp_board = [row[:] for row in self.board]
                self.drop_piece(row, col, self.ai_piece)
                new_score = self.minimax(depth-1, alpha, beta, False)[1]
                self.board = temp_board
                if new_score > value:
                    value = new_score
                    column = col
                alpha = max(alpha, value)
                if alpha >= beta:
                    break
            return column, value
        
        else:
            value = math.inf
            column = random.choice(valid_locations)
            for col in valid_locations:
                row = self.get_next_open_row(col)
                temp_board = [row[:] for row in self.board]
                self.drop_piece(row, col, self.human_piece)
                new_score = self.minimax(depth-1, alpha, beta, True)[1]
                self.board = temp_board
                if new_score < value:
                    value = new_score
                    column = col
                beta = min(beta, value)
                if alpha >= beta:
                    break
            return column, value
    
    def safe_input(self, prompt, default_value=None):
        """Safe input function that handles EOF errors"""
        try:
            return input(prompt)
        except EOFError:
            print(f"\nEOF detected. Using default value: {default_value}")
            return str(default_value) if default_value is not None else "quit"
    
    def play_game_interactive(self):
        """Interactive version of the game"""
        print("Welcome to Connect Four!")
        print("You are X and the computer is O")
        print("Choose a column (1-7) to drop your piece")
        print("Type 'quit' to exit the game")
        
        self.print_board()
        game_over = False
        turn = 0
        
        while not game_over:
            if turn == 0:
                try:
                    user_input = self.safe_input("Your turn! Choose column (1-7): ", "quit")
                    
                    if user_input.lower() in ['quit', 'exit', 'q']:
                        print("Thanks for playing!")
                        return
                    
                    col = int(user_input) - 1
                    
                    if col < 0 or col >= self.cols:
                        print("Invalid column! Please choose between 1-7")
                        continue
                        
                    if self.is_valid_location(col):
                        row = self.get_next_open_row(col)
                        self.drop_piece(row, col, self.human_piece)
                        
                        if self.winning_move(self.human_piece):
                            self.print_board()
                            print("Congratulations! You won! 🎉")
                            game_over = True
                            break
                        
                        turn = 1
                    else:
                        print("Column is full! Try another column.")
                        continue
                        
                except (ValueError, EOFError):
                    print("Invalid input or EOF detected. Exiting game.")
                    return
            
            else:
                print("Computer is thinking...")
                col, minimax_score = self.minimax(3, -math.inf, math.inf, True)
                
                if self.is_valid_location(col):
                    row = self.get_next_open_row(col)
                    self.drop_piece(row, col, self.ai_piece)
                    print(f"Computer chose column {col + 1}")
                    
                    if self.winning_move(self.ai_piece):
                        self.print_board()
                        print("Computer wins! Better luck next time!")
                        game_over = True
                        break
                    
                    turn = 0
            
            self.print_board()
            
            if len(self.get_valid_locations()) == 0:
                print("It's a draw! The board is full.")
                game_over = True
    
    def play_predetermined_game(self, human_moves):
        """
        Play a game with predetermined human moves (for testing/demo)
        
        Args:
            human_moves (list): List of column numbers (1-7) for human moves
        """
        print("Playing predetermined game...")
        print("Human moves:", human_moves)
        
        self.print_board()
        game_over = False
        turn = 0
        move_index = 0
        
        while not game_over and move_index < len(human_moves):
            if turn == 0:  # Human turn
                col = human_moves[move_index] - 1  # Convert to 0-based
                move_index += 1
                
                print(f"Human plays column {col + 1}")
                
                if 0 <= col < self.cols and self.is_valid_location(col):
                    row = self.get_next_open_row(col)
                    self.drop_piece(row, col, self.human_piece)
                    
                    if self.winning_move(self.human_piece):
                        self.print_board()
                        print("Human wins!")
                        game_over = True
                        break
                    
                    turn = 1
                else:
                    print(f"Invalid move: column {col + 1}")
                    continue
            
            else:  # AI turn
                print("Computer is thinking...")
                col, score = self.minimax(3, -math.inf, math.inf, True)
                
                if self.is_valid_location(col):
                    row = self.get_next_open_row(col)
                    self.drop_piece(row, col, self.ai_piece)
                    print(f"Computer chose column {col + 1} (score: {score})")
                    
                    if self.winning_move(self.ai_piece):
                        self.print_board()
                        print("Computer wins!")
                        game_over = True
                        break
                    
                    turn = 0
            
            self.print_board()
            
            if len(self.get_valid_locations()) == 0:
                print("It's a draw!")
                game_over = True
        
        if move_index >= len(human_moves) and not game_over:
            print("Predetermined moves exhausted. Game incomplete.")
    
    def demo_game(self):
        """Demo game showing AI vs AI for demonstration"""
        print("Running AI vs AI demonstration...")
        
        self.print_board()
        game_over = False
        turn = 0
        move_count = 0
        
        while not game_over and move_count < 42:  # Max possible moves
            move_count += 1
            
            if turn == 0:
                print(f"Move {move_count}: AI Player 1 thinking...")
                col, score = self.minimax(3, -math.inf, math.inf, True)
                piece = self.human_piece
                player_name = "AI Player 1 (X)"
            else:
                print(f"Move {move_count}: AI Player 2 thinking...")
                col, score = self.minimax(2, -math.inf, math.inf, True)  # Slightly weaker
                piece = self.ai_piece
                player_name = "AI Player 2 (O)"
            
            if self.is_valid_location(col):
                row = self.get_next_open_row(col)
                self.drop_piece(row, col, piece)
                print(f"{player_name} chose column {col + 1} (score: {score})")
                
                if self.winning_move(piece):
                    self.print_board()
                    print(f"{player_name} wins!")
                    game_over = True
                    break
                
                turn = 1 - turn  # Switch turns
            
            self.print_board()
            
            if len(self.get_valid_locations()) == 0:
                print("Demo game ended in a draw!")
                game_over = True
            
            # Small delay for readability
            import time
            time.sleep(0.5)

# Main execution with error handling
def main():
    """Main function with multiple game options"""
    print("Connect Four Game - Multiple Play Options")
    print("="*50)
    
    game = ConnectFour()
    
    # Option 1: Try interactive game
    try:
        print("\nOption 1: Interactive Game")
        print("Type 'skip' to try other options")
        
        choice = input("Do you want to play interactively? (y/n/skip): ").lower()
        
        if choice in ['y', 'yes']:
            game.play_game_interactive()
            return
        elif choice == 'skip':
            print("Skipping to other options...")
        
    except EOFError:
        print("Interactive input not available. Trying other options...")
    
    # Option 2: Predetermined game
    print("\nOption 2: Predetermined Game")
    print("Playing a sample game with predetermined moves...")
    
    # Sample human moves for demonstration
    sample_moves = [4, 3, 4, 5, 4, 2, 4]  # Human tries to win in column 4
    
    game_preset = ConnectFour()
    game_preset.play_predetermined_game(sample_moves)
    
    # Option 3: AI vs AI demo
    print("\nOption 3: AI vs AI Demonstration")
    
    game_demo = ConnectFour()
    game_demo.demo_game()

if __name__ == "__main__":
    main()