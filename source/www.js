import { bar, color, details, encode, families, fill, ranked, read, scatter, shade, sites, slug, times } from "./index.js";
const geometry = { left: 48, right: 664, top: 26, bottom: 384, radius: 4.5, font: 12, pad: 0, gap: 7, drop: 16, links: true };
const barGeometry = { left: 104, right: 640, top: 26, bottom: 384, radius: 2, font: 12, pad: 0, gap: 8, drop: 16, reference: false, tooltip: false, links: true };
const round = value => +value.toFixed(1);
const percent = value => Math.max(0, Math.min(100, value));
const formatUsd = value => value == null ? `—` : value < 10 ? `$${+value.toFixed(2)}` : `$${+value.toFixed(1)}`;
const formatTokens = value => value == null ? `—` : value >= 1e9 ? `${+(value / 1e9).toFixed(2)}B` : value >= 1e6 ? `${+(value / 1e6).toFixed(2)}M` : value >= 1e3 ? `${Math.round(value / 1e3)}k` : `${Math.round(value)}`;
const logos = {
	'Anthropic': `<path d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017l-1.344 3.46H0L6.57 3.522zm4.132 9.959L8.453 7.687 6.205 13.48H10.7z"/>`,
	'DeepSeek': `<path d="M23.748 4.482c-.254-.124-.364.113-.512.234-.051.039-.094.09-.137.136-.372.397-.806.657-1.373.626-.829-.046-1.537.214-2.163.848-.133-.782-.575-1.248-1.247-1.548-.352-.156-.708-.311-.955-.65-.172-.241-.219-.51-.305-.774-.055-.16-.11-.323-.293-.35-.2-.031-.278.136-.356.276-.313.572-.434 1.202-.422 1.84.027 1.436.633 2.58 1.838 3.393.137.093.172.187.129.323-.082.28-.18.552-.266.833-.055.179-.137.217-.329.14a5.526 5.526 0 01-1.736-1.18c-.857-.828-1.631-1.742-2.597-2.458a11.365 11.365 0 00-.689-.471c-.985-.957.13-1.743.388-1.836.27-.098.093-.432-.779-.428-.872.004-1.67.295-2.687.684a3.055 3.055 0 01-.465.137 9.597 9.597 0 00-2.883-.102c-1.885.21-3.39 1.102-4.497 2.623C.082 8.606-.231 10.684.152 12.85c.403 2.284 1.569 4.175 3.36 5.653 1.858 1.533 3.997 2.284 6.438 2.14 1.482-.085 3.133-.284 4.994-1.86.47.234.962.327 1.78.397.63.059 1.236-.03 1.705-.128.735-.156.684-.837.419-.961-2.155-1.004-1.682-.595-2.113-.926 1.096-1.296 2.746-2.642 3.392-7.003.05-.347.007-.565 0-.845-.004-.17.035-.237.23-.256a4.173 4.173 0 001.545-.475c1.396-.763 1.96-2.015 2.093-3.517.02-.23-.004-.467-.247-.588zM11.581 18c-2.089-1.642-3.102-2.183-3.52-2.16-.392.024-.321.471-.235.763.09.288.207.486.371.739.114.167.192.416-.113.603-.673.416-1.842-.14-1.897-.167-1.361-.802-2.5-1.86-3.301-3.307-.774-1.393-1.224-2.887-1.298-4.482-.02-.386.093-.522.477-.592a4.696 4.696 0 011.529-.039c2.132.312 3.946 1.265 5.468 2.774.868.86 1.525 1.887 2.202 2.891.72 1.066 1.494 2.082 2.48 2.914.348.292.625.514.891.677-.802.09-2.14.11-3.054-.614zm1-6.44a.306.306 0 01.415-.287.302.302 0 01.2.288.306.306 0 01-.31.307.303.303 0 01-.304-.308zm3.11 1.596c-.2.081-.399.151-.59.16a1.245 1.245 0 01-.798-.254c-.274-.23-.47-.358-.552-.758a1.73 1.73 0 01.016-.588c.07-.327-.008-.537-.239-.727-.187-.156-.426-.199-.688-.199a.559.559 0 01-.254-.078c-.11-.054-.2-.19-.114-.358.028-.054.16-.186.192-.21.356-.202.767-.136 1.146.016.352.144.618.408 1.001.782.391.451.462.576.685.914.176.265.336.537.445.848.067.195-.019.354-.25.452z"/>`,
	'Google': `<path d="M23 12.245c0-.905-.075-1.565-.236-2.25h-10.54v4.083h6.186c-.124 1.014-.797 2.542-2.294 3.569l-.021.136 3.332 2.53.23.022C21.779 18.417 23 15.593 23 12.245z"/><path d="M12.225 23c3.03 0 5.574-.978 7.433-2.665l-3.542-2.688c-.948.648-2.22 1.1-3.891 1.1a6.745 6.745 0 01-6.386-4.572l-.132.011-3.465 2.628-.045.124C4.043 20.531 7.835 23 12.225 23z"/><path d="M5.84 14.175A6.65 6.65 0 015.463 12c0-.758.138-1.491.361-2.175l-.006-.147-3.508-2.67-.115.054A10.831 10.831 0 001 12c0 1.772.436 3.447 1.197 4.938l3.642-2.763z"/><path d="M12.225 5.253c2.108 0 3.529.892 4.34 1.638l3.167-3.031C17.787 2.088 15.255 1 12.225 1 7.834 1 4.043 3.469 2.197 7.062l3.63 2.763a6.77 6.77 0 016.398-4.572z"/>`,
	'Meta': `<path d="M6.897 4c1.915 0 3.516.932 5.43 3.376l.282-.373c.19-.246.383-.484.58-.71l.313-.35C14.588 4.788 15.792 4 17.225 4c1.273 0 2.469.557 3.491 1.516l.218.213c1.73 1.765 2.917 4.71 3.053 8.026l.011.392.002.25c0 1.501-.28 2.759-.818 3.7l-.14.23-.108.153c-.301.42-.664.758-1.086 1.009l-.265.142-.087.04a3.493 3.493 0 01-.302.118 4.117 4.117 0 01-1.33.208c-.524 0-.996-.067-1.438-.215-.614-.204-1.163-.56-1.726-1.116l-.227-.235c-.753-.812-1.534-1.976-2.493-3.586l-1.43-2.41-.544-.895-1.766 3.13-.343.592C7.597 19.156 6.227 20 4.356 20c-1.21 0-2.205-.42-2.936-1.182l-.168-.184c-.484-.573-.837-1.311-1.043-2.189l-.067-.32a8.69 8.69 0 01-.136-1.288L0 14.468c.002-.745.06-1.49.174-2.23l.1-.573c.298-1.53.828-2.958 1.536-4.157l.209-.34c1.177-1.83 2.789-3.053 4.615-3.16L6.897 4zm-.033 2.615l-.201.01c-.83.083-1.606.673-2.252 1.577l-.138.199-.01.018c-.67 1.017-1.185 2.378-1.456 3.845l-.004.022a12.591 12.591 0 00-.207 2.254l.002.188c.004.18.017.36.04.54l.043.291c.092.503.257.908.486 1.208l.117.137c.303.323.698.492 1.17.492 1.1 0 1.796-.676 3.696-3.641l2.175-3.4.454-.701-.139-.198C9.11 7.3 8.084 6.616 6.864 6.616zm10.196-.552l-.176.007c-.635.048-1.223.359-1.82.933l-.196.198c-.439.462-.887 1.064-1.367 1.807l.266.398c.18.274.362.56.55.858l.293.475 1.396 2.335.695 1.114c.583.926 1.03 1.6 1.408 2.082l.213.262c.282.326.529.54.777.673l.102.05c.227.1.457.138.718.138.176.002.35-.023.518-.073.338-.104.61-.32.813-.637l.095-.163.077-.162c.194-.459.29-1.06.29-1.785l-.006-.449c-.08-2.871-.938-5.372-2.2-6.798l-.176-.189c-.67-.683-1.444-1.074-2.27-1.074z"/>`,
	'Moonshot': `<path d="M1.052 16.916l9.539 2.552a21.007 21.007 0 00.06 2.033l5.956 1.593a11.997 11.997 0 01-5.586.865l-.18-.016-.044-.004-.084-.009-.094-.01a11.605 11.605 0 01-.157-.02l-.107-.014-.11-.016a11.962 11.962 0 01-.32-.051l-.042-.008-.075-.013-.107-.02-.07-.015-.093-.019-.075-.016-.095-.02-.097-.023-.094-.022-.068-.017-.088-.022-.09-.024-.095-.025-.082-.023-.109-.03-.062-.02-.084-.025-.093-.028-.105-.034-.058-.019-.08-.026-.09-.031-.066-.024a6.293 6.293 0 01-.044-.015l-.068-.025-.101-.037-.057-.022-.08-.03-.087-.035-.088-.035-.079-.032-.095-.04-.063-.028-.063-.027a5.655 5.655 0 01-.041-.018l-.066-.03-.103-.047-.052-.024-.096-.046-.062-.03-.084-.04-.086-.044-.093-.047-.052-.027-.103-.055-.057-.03-.058-.032a6.49 6.49 0 01-.046-.026l-.094-.053-.06-.034-.051-.03-.072-.041-.082-.05-.093-.056-.052-.032-.084-.053-.061-.039-.079-.05-.07-.047-.053-.035a7.785 7.785 0 01-.054-.036l-.044-.03-.044-.03a6.066 6.066 0 01-.04-.028l-.057-.04-.076-.054-.069-.05-.074-.054-.056-.042-.076-.057-.076-.059-.086-.067-.045-.035-.064-.052-.074-.06-.089-.073-.046-.039-.046-.039a7.516 7.516 0 01-.043-.037l-.045-.04-.061-.053-.07-.062-.068-.06-.062-.058-.067-.062-.053-.05-.088-.084a13.28 13.28 0 01-.099-.097l-.029-.028-.041-.042-.069-.07-.05-.051-.05-.053a6.457 6.457 0 01-.168-.179l-.08-.088-.062-.07-.071-.08-.042-.049-.053-.062-.058-.068-.046-.056a7.175 7.175 0 01-.027-.033l-.045-.055-.066-.082-.041-.052-.05-.064-.02-.025a11.99 11.99 0 01-1.44-2.402zm-1.02-5.794l11.353 3.037a20.468 20.468 0 00-.469 2.011l10.817 2.894a12.076 12.076 0 01-1.845 2.005L.657 15.923l-.016-.046-.035-.104a11.965 11.965 0 01-.05-.153l-.007-.023a11.896 11.896 0 01-.207-.741l-.03-.126-.018-.08-.021-.097-.018-.081-.018-.09-.017-.084-.018-.094c-.026-.141-.05-.283-.071-.426l-.017-.118-.011-.083-.013-.102a12.01 12.01 0 01-.019-.161l-.005-.047a12.12 12.12 0 01-.034-2.145zm1.593-5.15l11.948 3.196c-.368.605-.705 1.231-1.01 1.875l11.295 3.022c-.142.82-.368 1.612-.668 2.365l-11.55-3.09L.124 10.26l.015-.1.008-.049.01-.067.015-.087.018-.098c.026-.148.056-.295.088-.442l.028-.124.02-.085.024-.097c.022-.09.045-.18.07-.268l.028-.102.023-.083.03-.1.025-.082.03-.096.026-.082.031-.095a11.896 11.896 0 011.01-2.232zm4.442-4.4L17.352 4.59a20.77 20.77 0 00-1.688 1.721l7.823 2.093c.267.852.442 1.744.513 2.665L2.106 5.213l.045-.065.027-.04.04-.055.046-.065.055-.076.054-.072.064-.086.05-.065.057-.073.055-.07.06-.074.055-.069.065-.077.054-.066.066-.077.053-.06.072-.082.053-.06.067-.074.054-.058.073-.078.058-.06.063-.067.168-.17.1-.098.059-.056.076-.071a12.084 12.084 0 012.272-1.677zM12.017 0h.097l.082.001.069.001.054.002.068.002.046.001.076.003.047.002.06.003.054.002.087.005.105.007.144.011.088.007.044.004.077.008.082.008.047.005.102.012.05.006.108.014.081.01.042.006.065.01.207.032.07.012.065.011.14.026.092.018.11.022.046.01.075.016.041.01L14.7.3l.042.01.065.015.049.012.071.017.096.024.112.03.113.03.113.032.05.015.07.02.078.024.073.023.05.016.05.016.076.025.099.033.102.036.048.017.064.023.093.034.11.041.116.045.1.04.047.02.06.024.041.018.063.026.04.018.057.025.11.048.1.046.074.035.075.036.06.028.092.046.091.045.102.052.053.028.049.026.046.024.06.033.041.022.052.029.088.05.106.06.087.051.057.034.053.032.096.059.088.055.098.062.036.024.064.041.084.056.04.027.062.042.062.043.023.017c.054.037.108.075.161.114l.083.06.065.048.056.043.086.065.082.064.04.03.05.041.086.069.079.065.085.071c.712.6 1.353 1.283 1.909 2.031L7.222.994l.062-.027.065-.028.081-.034.086-.035c.113-.045.227-.09.341-.131l.096-.035.093-.033.084-.03.096-.031c.087-.03.176-.058.264-.085l.091-.027.086-.025.102-.03.085-.023.1-.026L9.04.37l.09-.023.091-.022.095-.022.09-.02.098-.021.091-.02.095-.018.092-.018.1-.018.091-.016.098-.017.092-.014.097-.015.092-.013.102-.013.091-.012.105-.012.09-.01.105-.01c.093-.01.186-.018.28-.024l.106-.008.09-.005.11-.006.093-.004.1-.004.097-.002.099-.002.197-.002z"/>`,
	'OpenAI': `<path d="M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z"/>`,
	'Reflection': `<path d="M24 12a5.718 5.718 0 1 1-11.437 0A5.718 5.718 0 0 1 24 12M5.718 6.282a5.718 5.718 0 1 0 0 11.436 5.718 5.718 0 0 0 0-11.436M10.31 12a4.591 4.591 0 1 1-9.182 0 4.591 4.591 0 0 1 9.182 0"/>`,
	'xAI': `<path d="M6.469 8.776L16.512 23h-4.464L2.005 8.776H6.47zm-.004 7.9l2.233 3.164L6.467 23H2l4.465-6.324zM22 2.582V23h-3.659V7.764L22 2.582zM22 1l-9.952 14.095-2.233-3.163L17.533 1H22z"/>`,
	'Xiaomi': `<path d="M12 0C8.016 0 4.756.255 2.493 2.516.23 4.776 0 8.033 0 12.012c0 3.98.23 7.235 2.494 9.497C4.757 23.77 8.017 24 12 24c3.983 0 7.243-.23 9.506-2.491C23.77 19.247 24 15.99 24 12.012c0-3.984-.233-7.243-2.502-9.504C19.234.252 15.978 0 12 0zM4.906 7.405h5.624c1.47 0 3.007.068 3.764.827.746.746.827 2.233.83 3.676v4.54a.15.15 0 0 1-.152.147h-1.947a.15.15 0 0 1-.152-.148V11.83c-.002-.806-.048-1.634-.464-2.051-.358-.36-1.026-.441-1.72-.458H7.158a.15.15 0 0 0-.151.147v6.98a.15.15 0 0 1-.152.148H4.906a.15.15 0 0 1-.15-.148V7.554a.15.15 0 0 1 .15-.149zm12.131 0h1.949a.15.15 0 0 1 .15.15v8.892a.15.15 0 0 1-.15.148h-1.949a.15.15 0 0 1-.151-.148V7.554a.15.15 0 0 1 .151-.149zM8.92 10.948h2.046c.083 0 .15.066.15.147v5.352a.15.15 0 0 1-.15.148H8.92a.15.15 0 0 1-.152-.148v-5.352a.15.15 0 0 1 .152-.147Z"/>`,
	'Z.ai': `<path d="M12.105 2L9.927 4.953H.653L2.83 2h9.276zM23.254 19.048L21.078 22h-9.242l2.174-2.952h9.244zM24 2L9.264 22H0L14.736 2H24z"/>`,
	'Alibaba': `<path d="M24 14.014c-2.8 1.512-5.62 2.896-8.759 3.524-.7.139-1.476.139-2.187.043-.678-.085-1.017-.682-.776-1.31.23-.585.536-1.181.93-1.671.852-1.065 1.814-2.034 2.678-3.088a15.75 15.75 0 001.422-2.054c.306-.511.164-1.129-.372-1.384-.897-.437-1.859-.745-2.81-1.075-.11-.043-.274.074-.492.149.273.244.47.425.743.67-2.821.48-5.49 1.16-8.08 2.098-.012.053-.033.095-.023.117.383.585.208 1.032-.35 1.394a2.365 2.365 0 00-.568.522c1.706.5 3.226.213 4.68-.735-.087-.127-.175-.244-.262-.372.546.096.874.394.918.862.011.107-.054.213-.087.32-.077-.086-.175-.17-.24-.267-.045-.064-.056-.138-.088-.245-1.728 1.15-3.587 1.438-5.632.842 0 .404-.022.745.011 1.075.022.287-.098.415-.36.564-.591.362-1.204.735-1.696 1.214-.59.585-.371 1.299.427 1.597.907.34 1.859.35 2.81.234 1.126-.139 2.23-.32 3.456-.49-1.433.67-2.844 1.14-4.33 1.33-1.04.14-2.078.214-3.106-.084-1.476-.415-2.133-1.501-1.75-2.96.361-1.363 1.236-2.449 2.176-3.45 3.139-3.332 7.108-5.024 11.7-5.365 1.072-.074 2.155.064 3.16.511 1.411.639 2.002 1.99 1.313 3.354-.448.905-1.072 1.735-1.695 2.555-.612.809-1.301 1.554-1.946 2.331-.186.234-.361.48-.503.745-.274.5-.088.83.492.778 1.213-.118 2.45-.213 3.62-.511 1.716-.437 3.389-1.054 5.084-1.597.175-.043.339-.107.492-.17z"/>`,
	'Tencent': `<path d="M9.976 1L24 9.8l-10.587.015L10.723 23H5.489L8.18 9.8H3.244L1 5.4h8.077L9.976 1z"/>`,
	'Mistral': `<path d="M3.428 3.4h3.429v3.428H3.428V3.4zm13.714 0h3.43v3.428h-3.43V3.4zM3.428 6.828h6.857v3.429H3.429V6.828zm10.286 0h6.857v3.429h-6.857V6.828zM3.428 10.258h17.144v3.428H3.428v-3.428zM3.428 13.686h3.429v3.428H3.428v-3.428zm6.858 0h3.429v3.428h-3.429v-3.428zm6.856 0h3.43v3.428h-3.43v-3.428zM0 17.114h10.286v3.429H0v-3.429zm13.714 0H24v3.429H13.714v-3.429z"/>`,
	'Thinking Machines': `<path d="M1 5h9v2.4H6.8V19H4.2V7.4H1V5zm11 0h2.8l2.7 6.8L20.2 5H23v14h-2.5V9.6l-2.3 5.6h-1.4l-2.3-5.6V19H12V5z"/>`,
	'StepFun': `<path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM8.762 19.614H4.376v-4.386h4.386v4.386zm5.423 0H9.798v-4.386h4.387v4.386zm0-5.42H9.798V9.81h4.387v4.386zm0-5.418H9.798V4.39h4.387v4.386zm5.422-.004h-4.386V4.386h4.386v4.386z"/>`,
	'MiniMax': `<path d="M11.43 3.92a.86.86 0 1 0-1.718 0v14.236a1.999 1.999 0 0 1-3.997 0V9.022a.86.86 0 1 0-1.718 0v3.87a1.999 1.999 0 0 1-3.997 0V11.49a.57.57 0 0 1 1.139 0v1.404a.86.86 0 0 0 1.719 0V9.022a1.999 1.999 0 0 1 3.997 0v9.134a.86.86 0 0 0 1.719 0V3.92a1.998 1.998 0 1 1 3.996 0v11.788a.57.57 0 1 1-1.139 0zm10.572 3.105a2 2 0 0 0-1.999 1.997v7.63a.86.86 0 0 1-1.718 0V3.923a1.999 1.999 0 0 0-3.997 0v16.16a.86.86 0 0 1-1.719 0V18.08a.57.57 0 1 0-1.138 0v2a1.998 1.998 0 0 0 3.996 0V3.92a.86.86 0 0 1 1.719 0v12.73a1.999 1.999 0 0 0 3.996 0V9.023a.86.86 0 1 1 1.72 0v6.686a.57.57 0 0 0 1.138 0V9.022a2 2 0 0 0-1.998-1.997"/>`,
};
export const page = async list => {
	const chosen = list.slice(0, 2), spare = list.slice(2);
	const bars = Object.fromEntries([`index`, `cost`, `tokens`].map(metric => [metric, bar(list, metric, barGeometry)]));
	const middle = [340, 264], reach = 174, count = families.length;
	const angle = index => -Math.PI / 2 + index * 2 * Math.PI / count;
	const polar = (index, radius) => [middle[0] + Math.cos(angle(index)) * radius, middle[1] + Math.sin(angle(index)) * radius];
	const at = (index, value) => polar(index, reach * value / 100);
	const anchor = (index, near, far) => Math.cos(angle(index)) > .05 ? near : Math.cos(angle(index)) < -.05 ? far : `middle`;
	const pareto = new Set(list.filter(model => !list.some(other => other.cost <= model.cost && other.score >= model.score && (other.cost < model.cost || other.score > model.score))).map(model => model.name));
	const warn = `<span class="warn" tabindex="0" aria-label="Rough estimate"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg><span class="tip" role="tooltip">Rough estimate</span></span>`;
	const verified = `<span class="badge" tabindex="0" aria-label="Confident score"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg><span class="tip" role="tooltip">Confident score</span></span>`;
	const icons = model => {
		const coverage = Object.values(model.grades).filter(Number.isFinite).length;
		return coverage < 5 ? warn : coverage > 10 ? verified : ``;
	};
	const row = model => `<tr${pareto.has(model.name) ? ` class="pareto"` : ``}><td class="rank" data-value="${model.rank}">${model.rank}</td><td class="model" data-value="${encode(model.short)}"><a class="model-link" href="./${model.path}" data-model-link="${model.slug}">${encode(model.short)}</a>${icons(model)} <a class="lab lab-link" href="./${model.labSlug}" data-lab-link="${model.labSlug}">${encode(model.lab)}</a></td><td class="bar" data-value="${round(percent(model.score))}"><span class="meter" aria-hidden="true"><span class="fill" data-lab="${model.lab}" style="width:${round(percent(model.score))}%"></span><span class="ghost"></span></span></td><td class="num" data-value="${model.score}">${model.score.toFixed(1)}</td><td class="num" data-value="${model.cost}">${times(model.cost)}</td><td class="num" data-value="${model.tokens}">${times(model.tokens)}</td></tr>`;
	const pick = (model, slot) => `<span class="pick" data-name="${encode(model.name)}"${slot === undefined ? `` : ` data-slot="${slot}"`}><span class="swatch"></span><button type="button" aria-label="Remove ${encode(model.short)}">${encode(model.short)}</button></span>`;
	const option = model => `<option value="${encode(model.name)}" data-lab="${model.lab}"${chosen.includes(model) ? ` disabled` : ``}><span class="bullet"></span>${encode(model.short)}</option>`;
	const shape = (model, slot) => {
		const marks = families.flatMap((family, index) => Number.isFinite(model.grades[family]) ? [{ index, value: percent(50 + 18 * model.grades[family]) }] : []);
		return `<g class="shape"${slot === undefined ? `` : ` data-slot="${slot}"`}>${[
			marks.length > 2 ? `<polygon class="area" points="${marks.map(mark => at(mark.index, mark.value).map(round)).join(` `)}"/>` : ``,
			...marks.map((mark, index) => {
				if (marks.length < 2 || marks.length === 2 && index === 1) return ``;
				const next = marks[(index + 1) % marks.length], start = at(mark.index, mark.value).map(round), end = at(next.index, next.value).map(round);
				return `<line class="${(next.index - mark.index + count) % count > 1 ? `line gap` : `line`}" x1="${start[0]}" y1="${start[1]}" x2="${end[0]}" y2="${end[1]}"/>`;
			}),
			...marks.map(mark => {
				const spot = at(mark.index, mark.value).map(round), label = polar(mark.index, Math.max(0, reach * mark.value / 100 - 17)).map(round);
				return `<g class="point" data-axis="${mark.index}"><circle class="vertex" cx="${spot[0]}" cy="${spot[1]}" r="3.5"/><text class="value" x="${label[0]}" y="${round(label[1] + 4)}" text-anchor="${anchor(mark.index, `end`, `start`)}">${mark.value.toFixed(1)}</text></g>`;
			}),
		].join(``)}</g>`;
	};
	const frame = [
		...[20, 40, 60, 80, 100].map(value => `<polygon class="ring" points="${families.map((family, index) => at(index, value).map(round)).join(` `)}"/>`),
		...families.map((family, index) => `<line class="spoke" x1="${middle[0]}" y1="${middle[1]}" x2="${at(index, 100).map(round)[0]}" y2="${at(index, 100).map(round)[1]}"/>`),
		...[25, 50, 75, 100].map(value => `<text class="scale" x="${round(at(0, value)[0] + 5)}" y="${round(at(0, value)[1] + 3)}">${value}</text>`),
		...families.map((family, index) => `<a href="${sites[family]}" target="_blank" rel="noopener"><text class="axis" data-axis="${index}" x="${round(polar(index, reach + 24)[0])}" y="${round(polar(index, reach + 24)[1] + 4)}" text-anchor="${anchor(index, `start`, `end`)}">${family}</text></a>`),
	].join(``);
	return fill(await read(`../www/index.html`), {
		cost: scatter(list, `cost`, geometry).markup,
		tokens: scatter(list, `tokens`, geometry).markup,
		barIndex: `<path class="axis" d="${bars.index.axis}"/>${bars.index.markup}`,
		barCost: `<path class="axis" d="${bars.cost.axis}"/>${bars.cost.markup}`,
		barTokens: `<path class="axis" d="${bars.tokens.axis}"/>${bars.tokens.markup}`,
		rows: list.map(row).join(``),
		chosen: chosen.map(pick).join(``),
		options: list.map(option).join(``),
		others: spare.map(model => pick(model)).join(``),
		frame,
		active: chosen.map(shape).join(``),
		idle: spare.map(model => shape(model)).join(``),
	});
};
export const modelPages = (list, data) => {
	const byModel = details(data, list);
	const middle = [340, 264], reach = 174, count = families.length;
	const angle = index => -Math.PI / 2 + index * 2 * Math.PI / count;
	const polar = (index, radius) => [middle[0] + Math.cos(angle(index)) * radius, middle[1] + Math.sin(angle(index)) * radius];
	const at = (index, value) => polar(index, reach * value / 100);
	const anchor = (index, near, far) => Math.cos(angle(index)) > .05 ? near : Math.cos(angle(index)) < -.05 ? far : `middle`;
	const radarFrame = [
		...[20, 40, 60, 80, 100].map(value => `<polygon class="ring" points="${families.map((family, index) => at(index, value).map(round)).join(` `)}"/>`),
		...families.map((family, index) => `<line class="spoke" x1="${middle[0]}" y1="${middle[1]}" x2="${at(index, 100).map(round)[0]}" y2="${at(index, 100).map(round)[1]}"/>`),
		...[25, 50, 75, 100].map(value => `<text class="scale" x="${round(at(0, value)[0] + 5)}" y="${round(at(0, value)[1] + 3)}">${value}</text>`),
		...families.map((family, index) => `<a href="${sites[family]}" target="_blank" rel="noopener"><text class="axis" data-axis="${index}" x="${round(polar(index, reach + 24)[0])}" y="${round(polar(index, reach + 24)[1] + 4)}" text-anchor="${anchor(index, `start`, `end`)}">${family}</text></a>`),
	].join(``);
	const barPath = (x, y, width, height, radius) => {
		const r = Math.min(radius, width);
		return `M${round(x)} ${round(y)}H${round(x + width - r)}Q${round(x + width)} ${round(y)} ${round(x + width)} ${round(y + r)}V${round(y + height - r)}Q${round(x + width)} ${round(y + height)} ${round(x + width - r)} ${round(y + height)}H${round(x)}Z`;
	};
	return list.map(model => {
		const entries = byModel.get(model.name) ?? [];
		const marks = families.flatMap((family, index) => Number.isFinite(model.grades[family]) ? [{ index, value: percent(50 + 18 * model.grades[family]) }] : []);
		const radarShape = `<g class="shape" data-lab="${model.lab}">${[
			marks.length > 2 ? `<polygon class="area" points="${marks.map(mark => at(mark.index, mark.value).map(round)).join(` `)}"/>` : ``,
			...marks.map((mark, index) => {
				if (marks.length < 2 || marks.length === 2 && index === 1) return ``;
				const nxt = marks[(index + 1) % marks.length], start = at(mark.index, mark.value).map(round), end = at(nxt.index, nxt.value).map(round);
				return `<line class="${(nxt.index - mark.index + count) % count > 1 ? `line gap` : `line`}" x1="${start[0]}" y1="${start[1]}" x2="${end[0]}" y2="${end[1]}"/>`;
			}),
			...marks.map(mark => {
				const spot = at(mark.index, mark.value).map(round), label = polar(mark.index, Math.max(0, reach * mark.value / 100 - 17)).map(round);
				return `<g class="point" data-axis="${mark.index}"><circle class="vertex" cx="${spot[0]}" cy="${spot[1]}" r="3.5"/><text class="value" x="${label[0]}" y="${round(label[1] + 4)}" text-anchor="${anchor(mark.index, `end`, `start`)}">${mark.value.toFixed(1)}</text></g>`;
			}),
		].join(``)}</g>`;
		const tested = [...entries].sort((a, b) => b.normScore - a.normScore);
		const bLeft = 176, bRight = 640, bTop = 20, bHeight = Math.max(120, tested.length * 24), bBottom = bTop + bHeight, bStep = bHeight / tested.length, bH = Math.min(bStep * .62, 16);
		const bx = val => bLeft + (val / 100) * (bRight - bLeft);
		const scoreBars = [
			`<path class="axis" d="M${bLeft} ${bTop}V${bBottom}H${bRight}"/>`,
			...[25, 50, 75, 100].map(val => `<line class="grid${val === 50 ? ` ref-line` : ``}" x1="${round(bx(val))}" y1="${bTop}" x2="${round(bx(val))}" y2="${bBottom}"/><text class="tick" x="${round(bx(val))}" y="${bBottom + 16}" text-anchor="middle">${val}</text>`),
			...tested.map((entry, index) => {
				const y = bTop + bStep * (index + .5), w = Math.max(2, bx(entry.normScore) - bLeft);
				return `<a href="${entry.site}" target="_blank" rel="noopener"><text class="label" x="${bLeft - 8}" y="${round(y)}" text-anchor="end" dominant-baseline="central">${encode(entry.family)}</text></a><path class="bar" data-lab="${model.lab}" d="${barPath(bLeft, y - bH / 2, w, bH, 2)}"><title>${encode(entry.family)}: ${entry.normScore.toFixed(1)}</title></path><text class="value visible" x="${round(bLeft + w + 8)}" y="${round(y)}" dominant-baseline="central">${entry.normScore.toFixed(1)}</text>`;
			}),
		].join(``);
		const efficiencyChart = metric => {
			const field = metric === `cost` ? `relCost` : `relTokens`;
			const rows = entries.filter(item => item[field] != null).sort((a, b) => a[field] - b[field]);
			if (!rows.length) return `<p class="empty">No ${metric} data reported for this model.</p>`;
			const vals = rows.map(r => r[field]),
				minV = Math.min(...vals, 0.5), maxV = Math.max(...vals, 2),
				floor = Math.log10(minV * .65), ceil = Math.log10(maxV * 1.25),
				eLeft = 176, eRight = 640, eTop = 20, eHeight = Math.max(120, rows.length * 24), eBottom = eTop + eHeight,
				eStep = eHeight / rows.length,
				ex = v => eLeft + (Math.log10(v) - floor) / (ceil - floor) * (eRight - eLeft),
				ticks = [0.125, 0.25, 0.5, 1, 2, 4, 8, 16].filter(t => Math.log10(t) >= floor && Math.log10(t) <= ceil);
			return `<svg class="chart static ${metric}" viewBox="0 0 680 ${eBottom + 36}" width="680" height="${eBottom + 36}" role="img" aria-label="Relative ${metric} by benchmark">${[
				`<path class="axis" d="M${eLeft} ${eTop}V${eBottom}H${eRight}"/>`,
				...ticks.map(t => `<line class="grid${t === 1 ? ` ref-line` : ``}" x1="${round(ex(t))}" y1="${eTop}" x2="${round(ex(t))}" y2="${eBottom}"/><text class="tick" x="${round(ex(t))}" y="${eBottom + 16}" text-anchor="middle">${t}×</text>`),
				...rows.map((item, i) => {
					const y = eTop + eStep * (i + .5), x1 = ex(1), x2 = ex(item[field]), leftSide = x2 < x1 && x2 - eLeft >= 48;
					return `<text class="label" x="${eLeft - 8}" y="${round(y)}" text-anchor="end" dominant-baseline="central">${encode(item.family)}</text><line class="stem" data-lab="${model.lab}" x1="${round(x1)}" y1="${round(y)}" x2="${round(x2)}" y2="${round(y)}"/><circle class="dot" data-lab="${model.lab}" cx="${round(x2)}" cy="${round(y)}" r="4.5"/><text class="value visible" x="${round(leftSide ? x2 - 8 : x2 + 8)}" y="${round(y)}"${leftSide ? ` text-anchor="end"` : ``} dominant-baseline="central">${times(item[field])}</text>`;
				}),
			].join(``)}</svg>`;
		};
		const tableRows = tested.map(item => `<tr><td><a href="${item.site}" target="_blank" rel="noopener">${encode(item.family)}</a></td><td class="num" data-value="${item.normScore}">${item.normScore.toFixed(1)}</td><td class="num" data-value="${item.usd ?? 1e9}">${formatUsd(item.usd)}</td><td class="num" data-value="${item.tokens ?? 1e12}">${formatTokens(item.tokens)}</td></tr>`).join(``);
		const html = `<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>${encode(model.name)} — Models Engineering Index</title>
	<meta name="description" content="${encode(model.name)} (${encode(model.lab)}) engineering benchmark profile: Index ${model.score.toFixed(1)}, Rank #${model.rank}, ${times(model.cost)} cost, ${times(model.tokens)} tokens.">
	<meta name="color-scheme" content="light dark">
	<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
	<meta name="theme-color" content="#111111" media="(prefers-color-scheme: dark)">
	<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop stop-color='%23f0a9b8'/%3E%3Cstop offset='1' stop-color='%237d9fd0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='16' cy='16' r='11' fill='url(%23g)'/%3E%3C/svg%3E">
	<link rel="stylesheet" href="../../index.css">
	<script type="speculationrules">{"prefetch":[{"where":{"href_matches":["../../","../","../*"]},"eagerness":"moderate"}]}</script>
	<script defer src="https://cloud.umami.is/script.js" data-website-id="39ba71d6-92d6-4c6a-a7eb-06807a052eaa"></script>
</head>
<body>
	<main>
		<nav class="crumb" aria-label="Breadcrumb">
			<a href="../../">&larr; Back</a>
			<a href="../" data-lab-link="${model.labSlug}">${encode(model.lab)} &rarr;</a>
		</nav>
		<header class="model-header">
			<div class="title-row">
				<h1 class="model-title" data-lab="${model.lab}" style="view-transition-name: model-title-${model.slug}"><svg class="lab-logo" viewBox="0 0 24 24" width="22" height="22" fill-rule="evenodd" aria-hidden="true">${logos[model.lab] ?? ``}</svg>${encode(model.name)}</h1>
				<span class="rank-pill">#${model.rank}</span>
			</div>
			<div class="kpis">
				<div class="kpi"><span class="kpi-label">Index</span><span class="kpi-value">${model.score.toFixed(1)}</span></div>
				<div class="kpi"><span class="kpi-label">Cost</span><span class="kpi-value">${times(model.cost)}</span></div>
				<div class="kpi"><span class="kpi-label">Tokens</span><span class="kpi-value">${times(model.tokens)}</span></div>
				<div class="kpi"><span class="kpi-label">Coverage</span><span class="kpi-value">${entries.length}/${families.length}</span></div>
			</div>
		</header>
		<section class="model-viz" aria-label="Profile">
			<svg class="radar" viewBox="0 0 680 520" width="680" height="520" role="img" aria-label="${encode(model.name)} radar profile across 16 benchmarks">
				${radarFrame}
				<g class="shapes">${radarShape}</g>
			</svg>
		</section>
		<section class="model-viz bars" aria-label="Scores">
			<svg class="chart static performance" viewBox="0 0 680 ${bBottom + 36}" width="680" height="${bBottom + 36}" role="img" aria-label="${encode(model.name)} normalized benchmark scores">
				${scoreBars}
			</svg>
		</section>
		<section class="model-viz scatter" aria-label="Relative cost or tokens">
			<p class="title">Relative <input class="reader" type="radio" name="metric" id="cost" checked><label for="cost">cost</label><span aria-hidden="true"> or </span><input class="reader" type="radio" name="metric" id="tokens"><label for="tokens">tokens</label>:</p>
			${efficiencyChart(`cost`)}
			${efficiencyChart(`tokens`)}
		</section>
		<section class="rankings" aria-labelledby="bench-table">
			<h2 class="reader" id="bench-table">Benchmark breakdown</h2>
			<table aria-label="${encode(model.name)} benchmark results">
				<thead>
					<tr>
						<th scope="col" aria-sort="none"><button type="button">Benchmark</button></th>
						<th class="num" scope="col" aria-sort="descending" data-first="descending"><button type="button">Index</button></th>
						<th class="num" scope="col" aria-sort="none"><button type="button">Cost</button></th>
						<th class="num" scope="col" aria-sort="none"><button type="button">Tokens</button></th>
					</tr>
				</thead>
				<tbody>${tableRows}</tbody>
			</table>
		</section>
		<footer>
			<p>Models are tested on different subsets of benchmarks, so some scores rest on far less evidence than others, and there are no error bars, so small gaps are not meaningful. Scores are relative to the models listed, so adding or removing models shifts them. Benchmarks are weighted equally regardless of size or reliability. Cost is the reported cost of each benchmark run, so it reflects prices at the time and each benchmark's setup, not what a model costs on your workload. Results are reproduced as published, not independently verified, and may be affected by contamination or tuning to the benchmarks. Benchmarks are only a proxy for real engineering work.</p>
			<p>Data from <a href="https://cognition.ai">Cognition</a>, <a href="https://cursor.com">Cursor</a>, the <a href="https://laude.org">Laude Institute</a>, <a href="https://www.mercor.com">Mercor</a>, <a href="https://www.proximal.ai">Proximal</a>, <a href="https://labs.ramp.com">Ramp Labs</a>, <a href="https://labs.scale.com">Scale Labs</a>, <a href="https://withspecific.com">Specific Labs</a> and <a href="https://vals.ai">Vals AI</a>. Source on <a href="https://github.com/git-aarvin/mei" target="_blank">GitHub</a>.</p>
		</footer>
	</main>
	<script src="../../index.js"></script>
</body>
</html>
`;
		return { path: `${model.path}/index.html`, text: html };
	});
};
export const labPages = (list, data) => {
	const labs = ranked(list);
	const byModel = details(data, list);
	const middle = [340, 264], reach = 174, count = families.length;
	const angle = index => -Math.PI / 2 + index * 2 * Math.PI / count;
	const polar = (index, radius) => [middle[0] + Math.cos(angle(index)) * radius, middle[1] + Math.sin(angle(index)) * radius];
	const at = (index, value) => polar(index, reach * value / 100);
	const anchor = (index, near, far) => Math.cos(angle(index)) > .05 ? near : Math.cos(angle(index)) < -.05 ? far : `middle`;
	const radarFrame = [
		...[20, 40, 60, 80, 100].map(value => `<polygon class="ring" points="${families.map((family, index) => at(index, value).map(round)).join(` `)}"/>`),
		...families.map((family, index) => `<line class="spoke" x1="${middle[0]}" y1="${middle[1]}" x2="${at(index, 100).map(round)[0]}" y2="${at(index, 100).map(round)[1]}"/>`),
		...[25, 50, 75, 100].map(value => `<text class="scale" x="${round(at(0, value)[0] + 5)}" y="${round(at(0, value)[1] + 3)}">${value}</text>`),
		...families.map((family, index) => `<a href="${sites[family]}" target="_blank" rel="noopener"><text class="axis" data-axis="${index}" x="${round(polar(index, reach + 24)[0])}" y="${round(polar(index, reach + 24)[1] + 4)}" text-anchor="${anchor(index, `start`, `end`)}">${family}</text></a>`),
	].join(``);
	const pareto = new Set(list.filter(model => !list.some(other => other.cost <= model.cost && other.score >= model.score && (other.cost < model.cost || other.score > model.score))).map(model => model.name));
	const warn = `<span class="warn" tabindex="0" aria-label="Rough estimate"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg><span class="tip" role="tooltip">Rough estimate</span></span>`;
	const verified = `<span class="badge" tabindex="0" aria-label="Confident score"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg><span class="tip" role="tooltip">Confident score</span></span>`;
	const icons = model => {
		const coverage = Object.values(model.grades).filter(Number.isFinite).length;
		return coverage < 5 ? warn : coverage > 10 ? verified : ``;
	};
	const labScatter = (lab, metric) => {
		const { left, right, top, bottom, radius, pad, gap, drop, font } = geometry;
		const values = list.map(model => model[metric]), scores = list.map(model => model.score);
		const least = Math.log10(Math.min(...values) * .9), most = Math.log10(Math.max(...values) * 1.1);
		const floor = Math.floor(Math.min(...scores) / 10) * 10, ceiling = Math.ceil(Math.max(...scores) / 10) * 10;
		const horizontal = value => left + (most - Math.log10(value)) / (most - least) * (right - left);
		const vertical = value => bottom - (value - floor) / (ceiling - floor) * (bottom - top);
		const locate = model => [horizontal(model[metric]), vertical(model.score)];
		const upper = Math.floor(Math.log2(10 ** most)), lower = Math.ceil(Math.log2(10 ** least));
		const powers = Array.from({ length: Math.max(0, upper - lower + 1) }, (item, index) => 2 ** (upper - index));
		const columns = powers.length % 2 ? powers.filter((power, index) => index % 2 === 0) : powers;
		const rows = Array.from({ length: (ceiling - floor) / 10 + 1 }, (item, index) => floor + index * 10);
		const dots = list.map(locate);
		const front = list.filter(model => !list.some(other => other[metric] <= model[metric] && other.score >= model.score && (other[metric] < model[metric] || other.score > model.score))).sort((first, second) => second[metric] - first[metric]).map(locate);
		const stairs = front.flatMap((dot, index) => index ? [[front[index - 1][0], dot[1]], dot] : [dot]);
		const hit = (a, b, p) => a[0] < b[2] + p && a[2] + p > b[0] && a[1] < b[3] + p && a[3] + p > b[1];
		const taken = [];
		const dotBoxes = dots.map(dot => [dot[0] - radius - 3, dot[1] - radius - 3, dot[0] + radius + 3, dot[1] + radius + 3]);
		const labModels = list.filter(model => model.lab === lab);
		const placed = labModels.map(model => {
			const dot = locate(model), width = model.short.length * font * .68;
			let best = { score: Infinity, at: [dot[0] + radius + 8, dot[1] + font * .34], anchor: `start`, box: [0, 0, 0, 0] };
			for (const factor of [1, 1.7, 2.5, 3.5]) {
				const d = (radius + 8) * factor, diag = d * .78, level = font * .34, below = font * .6;
				for (const [dx, dy, anch] of [
					[d, level, `start`], [-d, level, `end`], [0, -d - 3, `middle`], [0, d + font * .78, `middle`],
					[diag, -diag, `start`], [diag, diag + below, `start`], [-diag, -diag, `end`], [-diag, diag + below, `end`],
				]) {
					const col = dot[0] + dx, base = dot[1] + dy;
					const start = anch === `start` ? col : anch === `end` ? col - width : col - width / 2;
					const shift = Math.max(left + 6 - start, Math.min(0, right - 6 - start - width));
					const box = [start + shift, base - font * .78, start + shift + width, base + font * .24];
					let score = factor * factor * 15 + Math.abs(shift) * .35;
					if (box[1] < top - 20 || box[3] > bottom - 4) score += 4000;
					for (const ob of dotBoxes) if (hit(box, ob, 2)) score += 1800;
					for (const prev of taken) if (hit(box, prev, 5)) score += 1600;
					if (score < best.score) best = { score, at: [col + shift, base], anchor: anch, box };
				}
			}
			taken.push(best.box);
			return { model, dot, ...best };
		});
		const bgDots = list.filter(model => model.lab !== lab).map(model => {
			const dot = locate(model);
			return `<circle class="dot-bg" cx="${round(dot[0])}" cy="${round(dot[1])}" r="3.5"/>`;
		});
		const fgDots = placed.map(({ model, dot }, index) => `<a href="./${model.modelSlug}" data-model-link="${model.slug}" aria-label="${encode(model.short)}" tabindex="-1"><circle class="dot" data-key="${index}" data-lab="${encode(lab)}" data-edge="${times(model[metric])}" data-score="${model.score.toFixed(1)}" fill="${color(lab)}" cx="${round(dot[0])}" cy="${round(dot[1])}" r="${radius}"/></a>`);
		const fgLabels = placed.map(({ model, at: pos, anchor: anch }, index) => `<a href="./${model.modelSlug}" data-model-link="${model.slug}" tabindex="-1"><text class="label" data-key="${index}" data-lab="${encode(lab)}" fill="${shade(color(lab), .7)}" x="${round(pos[0])}" y="${round(pos[1])}" text-anchor="${anch}">${encode(model.short)}</text></a>`);
		return [
			...rows.map(value => `<line class="grid" x1="${left - pad}" y1="${round(vertical(value))}" x2="${right}" y2="${round(vertical(value))}"/>`),
			...columns.map(value => `<line class="grid" x1="${round(horizontal(value))}" y1="${top}" x2="${round(horizontal(value))}" y2="${bottom + pad}"/>`),
			...rows.map(value => `<text class="tick" x="${left - gap}" y="${round(vertical(value))}" text-anchor="end" dominant-baseline="central">${value}</text>`),
			...columns.map(value => `<text class="tick" x="${round(horizontal(value))}" y="${bottom + drop}" text-anchor="middle">${value}×</text>`),
			`<polyline class="front" points="${stairs.map(dot => dot.map(round)).join(` `)}"/>`,
			...bgDots,
			...fgDots,
			...fgLabels,
		].join(``);
	};
	return labs.map((lab, labIndex) => {
		const labSlug = slug(lab);
		const labRank = labIndex + 1;
		const labModels = list.filter(model => model.lab === lab);
		const best = labModels[0];
		const cheapest = [...labModels].sort((a, b) => a.cost - b.cost)[0];
		const covered = families.filter(family => labModels.some(model => Number.isFinite(model.grades[family]))).length;
		const modelRows = labModels.map(model => `<tr${pareto.has(model.name) ? ` class="pareto"` : ``}><td class="rank" data-value="${model.rank}">${model.rank}</td><td class="model" data-value="${encode(model.short)}"><a class="model-link" href="./${model.modelSlug}" data-model-link="${model.slug}">${encode(model.short)}</a>${icons(model)}</td><td class="bar" data-value="${round(percent(model.score))}"><span class="meter" aria-hidden="true"><span class="fill" data-lab="${encode(lab)}" style="width:${round(percent(model.score))}%"></span><span class="ghost"></span></span></td><td class="num" data-value="${model.score}">${model.score.toFixed(1)}</td><td class="num" data-value="${model.cost}">${times(model.cost)}</td><td class="num" data-value="${model.tokens}">${times(model.tokens)}</td></tr>`).join(``);
		const radarShapes = labModels.map((model, index) => {
			const marks = families.flatMap((family, axis) => Number.isFinite(model.grades[family]) ? [{ axis, value: percent(50 + 18 * model.grades[family]) }] : []);
			const attr = labModels.length > 1 ? `data-slot="${index % 6}"` : `data-lab="${encode(lab)}"`;
			return `<g class="shape" ${attr}>${[
				marks.length > 2 ? `<polygon class="area" points="${marks.map(mark => at(mark.axis, mark.value).map(round)).join(` `)}"/>` : ``,
				...marks.map((mark, i) => {
					if (marks.length < 2 || marks.length === 2 && i === 1) return ``;
					const nxt = marks[(i + 1) % marks.length], start = at(mark.axis, mark.value).map(round), end = at(nxt.axis, nxt.value).map(round);
					return `<line class="${(nxt.axis - mark.axis + count) % count > 1 ? `line gap` : `line`}" x1="${start[0]}" y1="${start[1]}" x2="${end[0]}" y2="${end[1]}"/>`;
				}),
				...marks.map(mark => {
					const spot = at(mark.axis, mark.value).map(round), label = polar(mark.axis, Math.max(0, reach * mark.value / 100 - 17)).map(round);
					return `<g class="point" data-axis="${mark.axis}"><circle class="vertex" cx="${spot[0]}" cy="${spot[1]}" r="3.5"/><text class="value" x="${label[0]}" y="${round(label[1] + 4)}" text-anchor="${anchor(mark.axis, `end`, `start`)}">${mark.value.toFixed(1)}</text></g>`;
				}),
			].join(``)}</g>`;
		}).join(``);
		const renderPick = (model, index) => `<span class="pick"${labModels.length > 1 ? ` data-slot="${index % 6}"` : ` data-lab="${encode(lab)}"`}><span class="swatch"></span><a class="model-link" href="./${model.modelSlug}" data-model-link="${model.slug}">${encode(model.short)}</a></span>`;
		const legend = labModels.length > 1
			? `<p class="picks lab-picks"><span class="lead">Comparing</span> <span class="chosen">${labModels.slice(0, -1).map(renderPick).join(``)}</span> <span class="and">and</span> ${renderPick(labModels.at(-1), labModels.length - 1)}.</p>`
			: `<p class="picks lab-picks"><span class="lead">Comparing</span> <span class="chosen">${renderPick(labModels[0], 0)}</span>.</p>`;
		const benchRows = families.flatMap(family => {
			const hits = labModels.flatMap(model => {
				const entry = (byModel.get(model.name) ?? []).find(item => item.family === family);
				return entry ? [{ model, ...entry }] : [];
			});
			if (!hits.length) return [];
			hits.sort((a, b) => b.normScore - a.normScore);
			return [hits[0]];
		}).sort((a, b) => b.normScore - a.normScore).map(item => `<tr><td><a href="${item.site}" target="_blank" rel="noopener">${encode(item.family)}</a> <a class="lab lab-link" href="./${item.model.modelSlug}" data-model-link="${item.model.slug}">${encode(item.model.short)}</a></td><td class="num" data-value="${item.normScore}">${item.normScore.toFixed(1)}</td><td class="num" data-value="${item.usd ?? 1e9}">${formatUsd(item.usd)}</td><td class="num" data-value="${item.tokens ?? 1e12}">${formatTokens(item.tokens)}</td></tr>`).join(``);
		const html = `<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>${encode(lab)} — Models Engineering Index</title>
	<meta name="description" content="${encode(lab)} engineering benchmark profile across ${labModels.length} model${labModels.length === 1 ? `` : `s`}: best Index ${best.score.toFixed(1)} (#${best.rank}), lowest cost ${times(cheapest.cost)}.">
	<meta name="color-scheme" content="light dark">
	<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
	<meta name="theme-color" content="#111111" media="(prefers-color-scheme: dark)">
	<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop stop-color='%23f0a9b8'/%3E%3Cstop offset='1' stop-color='%237d9fd0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='16' cy='16' r='11' fill='url(%23g)'/%3E%3C/svg%3E">
	<link rel="stylesheet" href="../index.css">
	<script type="speculationrules">{"prefetch":[{"where":{"href_matches":["../","./*"]},"eagerness":"moderate"}]}</script>
	<script defer src="https://cloud.umami.is/script.js" data-website-id="39ba71d6-92d6-4c6a-a7eb-06807a052eaa"></script>
</head>
<body>
	<main>
		<nav class="crumb" aria-label="Breadcrumb">
			<a href="../">&larr; Back</a>
		</nav>
		<header class="model-header">
			<div class="title-row">
				<h1 class="model-title" data-lab="${encode(lab)}" style="view-transition-name: lab-title-${labSlug}"><svg class="lab-logo" viewBox="0 0 24 24" width="22" height="22" fill-rule="evenodd" aria-hidden="true">${logos[lab] ?? ``}</svg>${encode(lab)}</h1>
				<span class="rank-pill">#${labRank}</span>
			</div>
			<div class="kpis">
				<div class="kpi"><span class="kpi-label">Best</span><span class="kpi-value">${best.score.toFixed(1)}</span></div>
				<div class="kpi"><span class="kpi-label">Cheapest</span><span class="kpi-value">${times(cheapest.cost)}</span></div>
				<div class="kpi"><span class="kpi-label">Models</span><span class="kpi-value">${labModels.length}</span></div>
				<div class="kpi"><span class="kpi-label">Coverage</span><span class="kpi-value">${covered}/${families.length}</span></div>
			</div>
		</header>
		<section class="rankings" aria-labelledby="lab-models">
			<h2 class="reader" id="lab-models">Models</h2>
			<table aria-label="${encode(lab)} model rankings">
				<thead>
					<tr>
						<th class="rank" scope="col" aria-sort="ascending" data-first="ascending"><button type="button">#</button></th>
						<th scope="col" aria-sort="none"><button type="button">Model</button></th>
						<th class="bar" scope="col"><span class="reader">Index bar</span></th>
						<th class="num" scope="col" aria-sort="descending" data-first="descending"><button type="button">Index</button></th>
						<th class="num" scope="col" aria-sort="none"><button type="button">Cost</button></th>
						<th class="num" scope="col" aria-sort="none"><button type="button">Tokens</button></th>
					</tr>
				</thead>
				<tbody>${modelRows}</tbody>
			</table>
		</section>
		<section class="scatter" aria-labelledby="scatter-title">
			<p class="title" id="scatter-title">Performance versus
				<input class="reader" type="radio" name="metric" id="cost" checked><label for="cost">cost</label><span aria-hidden="true"> or </span><input class="reader" type="radio" name="metric" id="tokens"><label for="tokens">tokens</label>.
			</p>
			<svg class="chart cost" viewBox="0 0 680 424" width="680" height="424" role="img" aria-label="${encode(lab)} performance versus relative cost">
				<g class="cross" aria-hidden="true">
					<line class="vertical" y1="26" y2="384"/>
					<line class="horizontal" x1="48" x2="664"/>
					<text class="across" y="400" text-anchor="middle"></text>
					<text class="down" x="41" text-anchor="end" dominant-baseline="central"></text>
				</g>
				${labScatter(lab, `cost`)}
			</svg>
			<svg class="chart tokens" viewBox="0 0 680 424" width="680" height="424" role="img" aria-label="${encode(lab)} performance versus relative tokens">
				<g class="cross" aria-hidden="true">
					<line class="vertical" y1="26" y2="384"/>
					<line class="horizontal" x1="48" x2="664"/>
					<text class="across" y="400" text-anchor="middle"></text>
					<text class="down" x="41" text-anchor="end" dominant-baseline="central"></text>
				</g>
				${labScatter(lab, `tokens`)}
			</svg>
		</section>
		<section class="model-viz" aria-label="Profile">
			${legend}
			<svg class="radar" viewBox="0 0 680 520" width="680" height="520" role="img" aria-label="${encode(lab)} radar profile across 16 benchmarks">
				${radarFrame}
				<g class="shapes">${radarShapes}</g>
			</svg>
		</section>
		<section class="rankings" aria-labelledby="lab-benchmarks">
			<h2 class="reader" id="lab-benchmarks">Benchmark breakdown</h2>
			<table aria-label="${encode(lab)} best benchmark results">
				<thead>
					<tr>
						<th scope="col" aria-sort="none"><button type="button">Benchmark</button></th>
						<th class="num" scope="col" aria-sort="descending" data-first="descending"><button type="button">Index</button></th>
						<th class="num" scope="col" aria-sort="none"><button type="button">Cost</button></th>
						<th class="num" scope="col" aria-sort="none"><button type="button">Tokens</button></th>
					</tr>
				</thead>
				<tbody>${benchRows}</tbody>
			</table>
		</section>
		<footer>
			<p>Models are tested on different subsets of benchmarks, so some scores rest on far less evidence than others, and there are no error bars, so small gaps are not meaningful. Scores are relative to the models listed, so adding or removing models shifts them. Benchmarks are weighted equally regardless of size or reliability. Cost is the reported cost of each benchmark run, so it reflects prices at the time and each benchmark's setup, not what a model costs on your workload. Results are reproduced as published, not independently verified, and may be affected by contamination or tuning to the benchmarks. Benchmarks are only a proxy for real engineering work.</p>
			<p>Data from <a href="https://cognition.ai">Cognition</a>, <a href="https://cursor.com">Cursor</a>, the <a href="https://laude.org">Laude Institute</a>, <a href="https://www.mercor.com">Mercor</a>, <a href="https://www.proximal.ai">Proximal</a>, <a href="https://labs.ramp.com">Ramp Labs</a>, <a href="https://labs.scale.com">Scale Labs</a>, <a href="https://withspecific.com">Specific Labs</a> and <a href="https://vals.ai">Vals AI</a>. Source on <a href="https://github.com/git-aarvin/mei" target="_blank">GitHub</a>.</p>
		</footer>
	</main>
	<script src="../index.js"></script>
</body>
</html>
`;
		return { path: `${labSlug}/index.html`, text: html };
	});
};
