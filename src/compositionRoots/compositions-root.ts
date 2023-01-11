import {UsersRepository} from "../Repositories/users-repository";
import {AuthService} from "../domains/auth-service";
import {UserController} from "../controllers/user-controllers";
import {AuthController} from "../controllers/auth-controller";
import {QueryBloggersRepository} from "../Repositories/queryReposotories/query-bloggers-repository";
import {QueryPostsRepository} from "../Repositories/queryReposotories/query-posts-repository";
import {QueryUsersRepository} from "../Repositories/queryReposotories/query-users-repository";
import {BloggersRepository} from "../Repositories/bloggers-repository";
import {CommentsRepository} from "../Repositories/comments-repository";
import {PostsRepositories} from "../Repositories/posts-repository";
import {RequestLimitsRepository} from "../Repositories/request-limits-repository";
import {TestingRepository} from "../Repositories/testing-repository";
import {TokensRepository} from "../Repositories/tokens-repository";
import {BloggersService} from "../domains/bloggers-service";
import {JwtService} from "../domains/jwy-servive";
import {PostsService} from "../domains/posts-service";
import {RequestLimitsService} from "../domains/request-limits-service";
import {TestingService} from "../domains/testing-service";
import {BloggerController} from "../controllers/bloggers-controller";
import {CommentController} from "../controllers/comment-controller";
import {EmailController} from "../controllers/email-controller";
import {EmailService} from "../domains/email-service";
import {PostController} from "../controllers/post-controller";
import {SecurityController} from "../controllers/security-controller";
import {ClearDataController} from "../controllers/test-controller";

//Repositories
const usersRepository = new UsersRepository();
const queryBloggersRepository = new QueryBloggersRepository();
const queryPostsRepository = new QueryPostsRepository();
const queryUsersRepository = new QueryUsersRepository();
const bloggersRepository = new BloggersRepository();
const commentsRepository = new CommentsRepository();
export const postsRepositories = new PostsRepositories();
const requestLimitsRepository = new RequestLimitsRepository();
const testingRepository = new TestingRepository();
const tokensRepository = new TokensRepository();

//Services
const authService = new AuthService(usersRepository);
const bloggersService = new BloggersService(bloggersRepository);
const jwtService = new JwtService(usersRepository, tokensRepository);
const postsService = new PostsService(postsRepositories);
const requestLimitsService = new RequestLimitsService(requestLimitsRepository);
const testingService = new TestingService(testingRepository);
const emailService = new EmailService();

//Controllers
export const userController = new UserController(authService,queryUsersRepository);
export const authController = new AuthController(authService,
    usersRepository,
    jwtService,
    requestLimitsService,
    tokensRepository);
export const bloggerController = new BloggerController(queryPostsRepository,
    queryBloggersRepository,
    bloggersService,
    postsService);
export const commentController = new CommentController(commentsRepository);
export const emailController = new EmailController(emailService);
export const postController = new PostController(commentsRepository,
    queryPostsRepository,
    postsService);
export const securityController = new SecurityController(tokensRepository,
    jwtService);
export const clearDataController = new ClearDataController(testingService);