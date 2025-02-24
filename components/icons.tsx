import { cn } from "@/lib/utils/tailwind-util";
import { ComponentPropsWithoutRef } from "react";

export const Icons = {
  logo: ({ className, ...props }: ComponentPropsWithoutRef<"svg">) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="22"
      viewBox="0 0 20 22"
      fill="none"
      cursor="pointer"
      className={cn(className)}
      {...props}
    >
      <path
        d="M6.04898 1.5328C5.77502 1.49053 5.76347 1.48557 5.89239 1.46587C6.13945 1.42808 6.72283 1.47958 7.12484 1.57466C8.06336 1.79654 8.91735 2.36494 9.82894 3.37442L10.0711 3.64261L10.4176 3.58721C11.8771 3.35393 13.3619 3.53933 14.6038 4.10994C14.9454 4.26692 15.4841 4.5794 15.5514 4.6597C15.5728 4.6853 15.6122 4.85003 15.6389 5.02582C15.7311 5.63398 15.6849 6.10014 15.4979 6.44831C15.3962 6.63778 15.3905 6.69782 15.4589 6.85997C15.5135 6.98936 15.6658 7.08513 15.8166 7.08492C16.1252 7.08451 16.4574 6.58831 16.6113 5.89789L16.6724 5.62364L16.7935 5.76009C17.4579 6.5087 17.9796 7.52962 18.0693 8.25631L18.0926 8.44578L17.981 8.27353C17.7888 7.97714 17.5957 7.77537 17.3484 7.61264C16.9027 7.31931 16.4314 7.21948 15.1833 7.15406C14.056 7.09498 13.418 6.99921 12.7854 6.79404C11.709 6.445 11.1664 5.98015 9.88789 4.31174C9.31999 3.57068 8.96899 3.16067 8.61984 2.83048C7.82646 2.08022 7.04689 1.68675 6.04898 1.5328Z"
        fill="#FC74FE"
      ></path>
      <path
        d="M15.8056 3.1874C15.834 2.69082 15.9017 2.36329 16.0379 2.06417C16.0917 1.94577 16.1422 1.84887 16.15 1.84887C16.1578 1.84887 16.1344 1.93626 16.0979 2.04305C15.999 2.33335 15.9827 2.73041 16.0509 3.19236C16.1374 3.77851 16.1866 3.86308 16.8095 4.49624C17.1017 4.79322 17.4415 5.16778 17.5647 5.32859L17.7887 5.62099L17.5647 5.41202C17.2908 5.15648 16.6608 4.65812 16.5216 4.58688C16.4283 4.5391 16.4145 4.53992 16.3569 4.5969C16.3039 4.6494 16.2927 4.72829 16.2853 5.10123C16.2739 5.68248 16.1942 6.05556 16.002 6.4286C15.898 6.63037 15.8816 6.58731 15.9757 6.35957C16.046 6.18953 16.0531 6.11478 16.0526 5.55209C16.0515 4.42152 15.9165 4.14972 15.1251 3.68412C14.9247 3.56616 14.5943 3.39606 14.3911 3.30608C14.1878 3.2161 14.0264 3.13773 14.0322 3.13187C14.0547 3.10969 14.8265 3.33374 15.1371 3.45259C15.5992 3.62938 15.6754 3.65229 15.7316 3.63096C15.7692 3.61667 15.7874 3.5077 15.8056 3.1874Z"
        fill="#FC74FE"
      ></path>
      <path
        d="M6.58113 5.12149C6.02497 4.35993 5.68086 3.19229 5.75536 2.31943L5.77839 2.04932L5.90499 2.0723C6.14272 2.11543 6.55263 2.26718 6.74457 2.38313C7.2713 2.7013 7.49933 3.12019 7.73132 4.19585C7.79928 4.51092 7.88843 4.86746 7.92946 4.98817C7.9955 5.18246 8.24507 5.63629 8.44797 5.93103C8.59412 6.1433 8.49704 6.24389 8.17398 6.21488C7.68059 6.17058 7.01227 5.71183 6.58113 5.12149Z"
        fill="#FC74FE"
      ></path>
      <path
        d="M15.1311 10.7894C12.532 9.74852 11.6165 8.84507 11.6165 7.32069C11.6165 7.09636 11.6243 6.91281 11.6338 6.91281C11.6432 6.91281 11.7438 6.98684 11.8572 7.07734C12.3843 7.49779 12.9745 7.67736 14.6083 7.91444C15.5698 8.05396 16.1109 8.16664 16.61 8.33127C18.1963 8.85454 19.1778 9.91646 19.4119 11.3629C19.4799 11.7831 19.44 12.5713 19.3297 12.9867C19.2427 13.3147 18.977 13.9061 18.9066 13.9288C18.8871 13.9351 18.8679 13.8606 18.8629 13.7593C18.8361 13.2162 18.5602 12.6874 18.0968 12.2913C17.5699 11.841 16.862 11.4825 15.1311 10.7894Z"
        fill="#FC74FE"
      ></path>
      <path
        d="M13.3064 11.2218C13.2738 11.029 13.2174 10.7829 13.1809 10.6748L13.1146 10.4782L13.2377 10.6158C13.4082 10.8061 13.5429 11.0496 13.6571 11.3739C13.7442 11.6215 13.754 11.6951 13.7534 12.0973C13.7527 12.4922 13.7418 12.575 13.6614 12.7978C13.5345 13.1492 13.377 13.3983 13.1128 13.6657C12.638 14.1463 12.0276 14.4124 11.1468 14.5228C10.9937 14.5419 10.5474 14.5743 10.1551 14.5945C9.16633 14.6457 8.51558 14.7514 7.93085 14.9556C7.84678 14.985 7.77172 15.0028 7.7641 14.9952C7.74044 14.9718 8.13855 14.7358 8.46739 14.5782C8.93106 14.3561 9.39262 14.2348 10.4268 14.0636C10.9376 13.9789 11.4652 13.8763 11.5991 13.8354C12.8642 13.4496 13.5145 12.454 13.3064 11.2218Z"
        fill="#FC74FE"
      ></path>
      <path
        d="M14.4979 13.3263C14.1525 12.588 14.0732 11.8751 14.2624 11.2103C14.2827 11.1392 14.3152 11.0811 14.3348 11.0811C14.3544 11.0811 14.4359 11.1249 14.5159 11.1784C14.675 11.285 14.9941 11.4644 15.8444 11.9255C16.9054 12.5009 17.5104 12.9464 17.9218 13.4554C18.2821 13.9012 18.505 14.4089 18.6123 15.028C18.6731 15.3787 18.6375 16.2225 18.547 16.5757C18.2617 17.6891 17.5987 18.5637 16.6531 19.0741C16.5145 19.1488 16.3901 19.2102 16.3767 19.2105C16.3632 19.2108 16.4137 19.0831 16.4889 18.9268C16.807 18.2654 16.8432 17.622 16.6027 16.9059C16.4554 16.4674 16.1552 15.9324 15.5489 15.0282C14.8441 13.9768 14.6713 13.6971 14.4979 13.3263Z"
        fill="#FC74FE"
      ></path>
      <path
        d="M4.73535 17.3101C5.69986 16.5001 6.89994 15.9246 7.9931 15.748C8.46422 15.6719 9.24904 15.7021 9.68529 15.8132C10.3846 15.9912 11.0101 16.3898 11.3355 16.8648C11.6534 17.329 11.7898 17.7336 11.9318 18.6336C11.9878 18.9887 12.0488 19.3453 12.0672 19.426C12.1739 19.8924 12.3814 20.2653 12.6386 20.4526C13.0471 20.7499 13.7505 20.7684 14.4424 20.5C14.5598 20.4544 14.6618 20.4229 14.669 20.43C14.694 20.4548 14.3456 20.6868 14.0998 20.8089C13.7691 20.9732 13.5061 21.0367 13.1566 21.0367C12.5229 21.0367 11.9967 20.7161 11.5577 20.0623C11.4713 19.9336 11.2771 19.5482 11.1262 19.2059C10.6626 18.1543 10.4337 17.834 9.89554 17.4834C9.42717 17.1784 8.82312 17.1237 8.3687 17.3453C7.77179 17.6364 7.60525 18.3951 8.03277 18.8759C8.20269 19.067 8.51955 19.2318 8.77865 19.2639C9.26337 19.3239 9.67993 18.9571 9.67993 18.4703C9.67993 18.1543 9.5578 17.9739 9.25033 17.8359C8.83039 17.6475 8.379 17.8678 8.38116 18.2601C8.3821 18.4274 8.45535 18.5325 8.62398 18.6084C8.73216 18.6571 8.73467 18.6609 8.64646 18.6427C8.26115 18.5632 8.17088 18.1012 8.48068 17.7945C8.85263 17.4263 9.62176 17.5888 9.88587 18.0914C9.99684 18.3025 10.0097 18.7229 9.91297 18.9768C9.69646 19.545 9.06517 19.8438 8.42476 19.6812C7.98875 19.5705 7.81122 19.4506 7.28553 18.9121C6.37207 17.9762 6.01745 17.7949 4.70055 17.5904L4.44819 17.5512L4.73535 17.3101Z"
        fill="#FC74FE"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.44926 0.55979C3.4998 4.24228 5.60086 5.76161 5.83435 6.0826C6.02713 6.34765 5.95457 6.58593 5.62431 6.77268C5.44065 6.87651 5.06307 6.98171 4.87401 6.98171C4.66018 6.98171 4.58677 6.89967 4.58677 6.89967C4.46279 6.78271 4.39296 6.80317 3.75628 5.67912C2.87236 4.31495 2.13263 3.18331 2.11245 3.16437C2.06579 3.12055 2.06659 3.12203 3.66615 5.96862C3.92459 6.56192 3.71756 6.7797 3.71756 6.86421C3.71756 7.03611 3.67041 7.12646 3.4572 7.36299C3.10178 7.75736 2.9429 8.20047 2.82821 9.11753C2.69963 10.1455 2.33809 10.8717 1.33613 12.1146C0.749626 12.8421 0.653656 12.9754 0.505663 13.2687C0.319254 13.6379 0.267998 13.8447 0.247224 14.311C0.225267 14.804 0.268031 15.1225 0.419469 15.5939C0.552047 16.0065 0.690435 16.279 1.04422 16.824C1.34953 17.2944 1.52533 17.6439 1.52533 17.7806C1.52533 17.8894 1.54621 17.8895 2.01931 17.7833C3.15151 17.529 4.07085 17.0817 4.58791 16.5337C4.9079 16.1944 4.98303 16.0071 4.98547 15.5422C4.98707 15.2381 4.97631 15.1745 4.89367 14.9995C4.75914 14.7148 4.51424 14.4781 3.97447 14.1111C3.26721 13.6302 2.96514 13.2431 2.88169 12.7107C2.81325 12.2738 2.89265 11.9656 3.28391 11.15C3.68888 10.3058 3.78924 9.94602 3.85713 9.09507C3.90097 8.5453 3.96169 8.32848 4.12051 8.15445C4.28614 7.97297 4.43525 7.91151 4.84517 7.85581C5.51345 7.765 5.93898 7.59304 6.28876 7.27246C6.5922 6.99435 6.71917 6.72638 6.73866 6.32298L6.75345 6.01722L6.58388 5.82059C5.96981 5.10846 0.0380236 0 0.000233728 0C-0.00783924 0 0.194231 0.251923 0.44926 0.55979ZM1.87003 14.8689C2.00887 14.6243 1.9351 14.3099 1.70287 14.1563C1.48343 14.0112 1.14256 14.0795 1.14256 14.2687C1.14256 14.3264 1.17464 14.3684 1.24695 14.4054C1.36871 14.4677 1.37754 14.5378 1.28175 14.681C1.18473 14.826 1.19256 14.9535 1.30384 15.0402C1.48319 15.1799 1.73707 15.103 1.87003 14.8689Z"
        fill="#FC74FE"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.17519 8.0162C6.86146 8.11204 6.55649 8.44275 6.46209 8.78951C6.4045 9.00105 6.43718 9.37214 6.52344 9.48675C6.6628 9.67184 6.79757 9.72061 7.16249 9.71807C7.87695 9.71311 8.49805 9.40834 8.57025 9.02734C8.62944 8.71503 8.35666 8.28221 7.98092 8.0922C7.78703 7.99419 7.37468 7.9553 7.17519 8.0162ZM8.01039 8.66577C8.12056 8.51006 8.07237 8.34178 7.88498 8.22796C7.52814 8.01124 6.9885 8.19058 6.9885 8.52587C6.9885 8.69277 7.26991 8.87487 7.52786 8.87487C7.69955 8.87487 7.9345 8.77304 8.01039 8.66577Z"
        fill="#FC74FE"
      ></path>
    </svg>
  ),
  dropdown: ({ className, ...props }: ComponentPropsWithoutRef<"svg">) => (
    <svg
      width="12px"
      height="12px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(["text-[rgb(125,125,125)]", className])}
      {...props}
    >
      <path
        d="M10.6979 16.2453L6.31787 9.75247C5.58184 8.66118 6.2058 7 7.35185 7L16.6482 7C17.7942 7 18.4182 8.66243 17.6821 9.75247L13.3021 16.2453C12.623 17.2516 11.377 17.2516 10.6979 16.2453Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  close: ({ className, ...props }: ComponentPropsWithoutRef<"svg">) => (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      strokeWidth="8"
      className={cn(["size-6 text-[rgb(125,125,125)]", className])}
      {...props}
    >
      <path
        d="M12.5303 4.53033C12.8232 4.23744 12.8232 3.76256 12.5303 3.46967C12.2374 3.17678 11.7626 3.17678 11.4697 3.46967L12.5303 4.53033ZM3.46967 11.4697C3.17678 11.7626 3.17678 12.2374 3.46967 12.5303C3.76256 12.8232 4.23744 12.8232 4.53033 12.5303L3.46967 11.4697ZM4.53033 3.46967C4.23744 3.17678 3.76256 3.17678 3.46967 3.46967C3.17678 3.76256 3.17678 4.23744 3.46967 4.53033L4.53033 3.46967ZM11.4697 12.5303C11.7626 12.8232 12.2374 12.8232 12.5303 12.5303C12.8232 12.2374 12.8232 11.7626 12.5303 11.4697L11.4697 12.5303ZM11.4697 3.46967L3.46967 11.4697L4.53033 12.5303L12.5303 4.53033L11.4697 3.46967ZM3.46967 4.53033L11.4697 12.5303L12.5303 11.4697L4.53033 3.46967L3.46967 4.53033Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  cog: ({ className, ...props }: ComponentPropsWithoutRef<"svg">) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="8"
      className={cn(className)}
      {...props}
    >
      <path
        d="M22.7922 15.1778C21.6555 14.5178 20.9589 13.3078 20.9589 12C20.9589 10.6922 21.6555 9.48221 22.7922 8.82221C22.9878 8.69999 23.0611 8.45556 22.9389 8.26L20.8978 4.74C20.8244 4.60555 20.69 4.53224 20.5556 4.53224C20.4822 4.53224 20.4089 4.55667 20.3478 4.59334C19.7855 4.91111 19.15 5.08222 18.5144 5.08222C17.8667 5.08222 17.2311 4.9111 16.6567 4.5811C15.52 3.9211 14.8233 2.72333 14.8233 1.41555C14.8233 1.18333 14.64 1 14.42 1H9.57999C9.35999 1 9.17667 1.18333 9.17667 1.41555C9.17667 2.72333 8.48 3.9211 7.34334 4.5811C6.76889 4.9111 6.13335 5.08222 5.48557 5.08222C4.85002 5.08222 4.21446 4.91111 3.65224 4.59334C3.45668 4.47111 3.21222 4.54444 3.10222 4.74L1.0489 8.26C1.01223 8.32111 1 8.39445 1 8.45556C1 8.60223 1.07335 8.73666 1.20779 8.82221C2.34446 9.48221 3.04113 10.68 3.04113 11.9878C3.04113 13.3078 2.34444 14.5178 1.21999 15.1778H1.20779C1.01224 15.3 0.938874 15.5444 1.0611 15.74L3.10222 19.26C3.17556 19.3944 3.31 19.4678 3.44444 19.4678C3.51778 19.4678 3.59113 19.4433 3.65224 19.4067C4.80113 18.7589 6.20667 18.7589 7.34334 19.4189C8.46778 20.0789 9.16444 21.2767 9.16444 22.5844C9.16444 22.8167 9.34776 23 9.57999 23H14.42C14.64 23 14.8233 22.8167 14.8233 22.5844C14.8233 21.2767 15.52 20.0789 16.6567 19.4189C17.2311 19.0889 17.8667 18.9178 18.5144 18.9178C19.15 18.9178 19.7855 19.0889 20.3478 19.4067C20.5433 19.5289 20.7878 19.4556 20.8978 19.26L22.9511 15.74C22.9878 15.6789 23 15.6055 23 15.5444C23 15.3978 22.9267 15.2633 22.7922 15.1778ZM12 15.6667C9.97111 15.6667 8.33333 14.0289 8.33333 12C8.33333 9.97111 9.97111 8.33333 12 8.33333C14.0289 8.33333 15.6667 9.97111 15.6667 12C15.6667 14.0289 14.0289 15.6667 12 15.6667Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  search: ({ className, ...props }: ComponentPropsWithoutRef<"svg">) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20px"
      height="20px"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#7D7D7D"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn([className])}
      {...props}
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  ),
  moreItems: ({ className, ...props }: ComponentPropsWithoutRef<"svg">) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="8"
      className={cn("size-5 cursor-pointer text-[rgb(125,125,125)]", className)}
      {...props}
    >
      <path
        d="M4.02002 14C2.91602 14 2.01501 13.104 2.01501 12C2.01501 10.896 2.90501 10 4.01001 10H4.02002C5.12402 10 6.02002 10.896 6.02002 12C6.02002 13.104 5.12502 14 4.02002 14ZM14.02 12C14.02 10.896 13.124 10 12.02 10H12.01C10.906 10 10.015 10.896 10.015 12C10.015 13.104 10.915 14 12.02 14C13.125 14 14.02 13.104 14.02 12ZM22.02 12C22.02 10.896 21.124 10 20.02 10H20.01C18.906 10 18.015 10.896 18.015 12C18.015 13.104 18.915 14 20.02 14C21.125 14 22.02 13.104 22.02 12Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  arrowDown: ({ className, ...props }: ComponentPropsWithoutRef<"svg">) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      className={cn(["size-6", className])}
      {...props}
    >
      <path
        d="M12 5V19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M19 12L12 19L5 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  ),
  chevronLeft: ({ className, ...props }: ComponentPropsWithoutRef<"svg">) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="8"
      className={cn(["size-6", className])}
      {...props}
    >
      <path
        d="M15.7071 5.29289C16.0976 5.68342 16.0976 6.31658 15.7071 6.70711L10.4142 12L15.7071 17.2929C16.0976 17.6834 16.0976 18.3166 15.7071 18.7071C15.3166 19.0976 14.6834 19.0976 14.2929 18.7071L8.2929 12.7071C7.9024 12.3166 7.9024 11.6834 8.2929 11.2929L14.2929 5.29289C14.6834 4.90237 15.3166 4.90237 15.7071 5.29289Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  ),
  info: ({ className, ...props }: ComponentPropsWithoutRef<"svg">) => (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      strokeWidth="8"
      className={cn(["size-4", className])}
      {...props}
    >
      <path
        d="M8.00001 1.33334C4.31801 1.33334 1.33334 4.318 1.33334 8C1.33334 11.682 4.31801 14.6667 8.00001 14.6667C11.682 14.6667 14.6667 11.682 14.6667 8C14.6667 4.318 11.682 1.33334 8.00001 1.33334ZM8.50001 11C8.50001 11.276 8.27601 11.5 8.00001 11.5C7.72401 11.5 7.50001 11.276 7.50001 11V7.95264C7.50001 7.67664 7.72401 7.45264 8.00001 7.45264C8.27601 7.45264 8.50001 7.67664 8.50001 7.95264V11ZM8.01336 6.33334C7.64536 6.33334 7.34327 6.03467 7.34327 5.66667C7.34327 5.29867 7.63868 5 8.00668 5H8.01336C8.38202 5 8.68002 5.29867 8.68002 5.66667C8.68002 6.03467 8.38136 6.33334 8.01336 6.33334Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  moneyStack: ({ className, ...props }: ComponentPropsWithoutRef<"svg">) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="8"
      className={cn(["size-4", className])}
      {...props}
    >
      <path
        d="M7.5 18.01C7.5 18.74 7.72001 19.4 8.13 19.97C5.45 19.8 3 18.82 3 17.01V16.13C4.05 16.95 5.6 17.5 7.5 17.68V18.01ZM7.53998 13.94C7.52998 13.95 7.53003 13.96 7.53003 13.97C7.51003 14.07 7.5 14.17 7.5 14.27V16.18C5.08 15.9 3 14.94 3 13.27V12.39C4.05 13.22 5.61003 13.77 7.53003 13.94H7.53998ZM11.44 10.28C9.92 10.75 8.73001 11.52 8.07001 12.48C5.41001 12.31 3 11.33 3 9.53003V8.84998C4.31 9.87998 6.41 10.48 9 10.48C9.87 10.48 10.69 10.41 11.44 10.28ZM15 8.84998V9.53003C15 9.62003 14.99 9.70003 14.98 9.78003C14.19 9.78003 13.44 9.84997 12.74 9.96997C13.64 9.69997 14.4 9.31998 15 8.84998ZM9 3C6 3 3 3.99999 3 5.98999C3 7.99999 6 8.97998 9 8.97998C12 8.97998 15 7.99999 15 5.98999C15 3.99999 12 3 9 3ZM15 18.76C12.49 18.76 10.35 18.1 9 17.03V18.01C9 20 12 21 15 21C18 21 21 20 21 18.01V17.03C19.65 18.1 17.51 18.76 15 18.76ZM15 11.28C11.69 11.28 9 12.62 9 14.27C9 15.92 11.69 17.26 15 17.26C18.31 17.26 21 15.92 21 14.27C21 12.62 18.31 11.28 15 11.28Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  time: ({ className, ...props }: ComponentPropsWithoutRef<"svg">) => (
    <svg
      viewBox="0 0 18 18"
      fill="none"
      strokeWidth="8"
      className={cn(["size-4", className])}
      {...props}
    >
      <path
        d="M8.99984 0.666748C4.39734 0.666748 0.666504 4.39758 0.666504 9.00008C0.666504 13.6026 4.39734 17.3334 8.99984 17.3334C13.6023 17.3334 17.3332 13.6026 17.3332 9.00008C17.3332 4.39758 13.6023 0.666748 8.99984 0.666748ZM11.9415 11.9418C11.8199 12.0634 11.6598 12.1251 11.4998 12.1251C11.3398 12.1251 11.1798 12.0643 11.0581 11.9418L8.55815 9.44177C8.44065 9.32427 8.37484 9.16508 8.37484 9.00008V4.83341C8.37484 4.48841 8.65484 4.20841 8.99984 4.20841C9.34484 4.20841 9.62484 4.48841 9.62484 4.83341V8.74088L11.9415 11.0576C12.1857 11.3026 12.1857 11.6976 11.9415 11.9418Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  ),
  star: ({ className, ...props }: ComponentPropsWithoutRef<"svg">) => (
    <svg
      viewBox="0 0 18 17"
      fill="none"
      strokeWidth="8"
      className={cn(["size-4", className])}
      {...props}
    >
      <path
        d="M8.80054 0.829883L10.4189 4.09404C10.5406 4.33988 10.7756 4.50989 11.0481 4.54906L14.7838 5.08902C15.4688 5.18818 15.7422 6.0282 15.2464 6.50987L12.5456 9.13071C12.3481 9.32238 12.258 9.5982 12.3047 9.86904L12.9221 13.4557C13.0471 14.1832 12.283 14.7382 11.628 14.3957L8.38805 12.6999C8.14471 12.5724 7.85469 12.5724 7.61219 12.6999L4.37468 14.394C3.71885 14.7374 2.95216 14.1815 3.07799 13.4524L3.69556 9.86904C3.74223 9.5982 3.65218 9.32238 3.45468 9.13071L0.753871 6.50987C0.257205 6.0282 0.530481 5.18818 1.21631 5.08902L4.95217 4.54906C5.22384 4.50989 5.45885 4.33988 5.58135 4.09404L7.19969 0.829883C7.52553 0.167383 8.47221 0.167383 8.80054 0.829883Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  checked: ({ className, ...props }: ComponentPropsWithoutRef<"svg">) => (
    <svg
      viewBox="0 0 17 18"
      fill="none"
      strokeWidth="8"
      className={cn(["w-5", className])}
      {...props}
    >
      <path
        d="M8.62508 0.666664C4.02508 0.666664 0.291748 4.4 0.291748 9C0.291748 13.6 4.02508 17.3333 8.62508 17.3333C13.2251 17.3333 16.9584 13.6 16.9584 9C16.9584 4.4 13.2251 0.666664 8.62508 0.666664ZM11.9834 7.50001L8.09173 11.3833C7.97507 11.5083 7.81674 11.5667 7.65007 11.5667C7.49174 11.5667 7.3334 11.5083 7.2084 11.3833L5.26675 9.44169C5.02508 9.20002 5.02508 8.79997 5.26675 8.55831C5.50841 8.31664 5.90841 8.31664 6.15008 8.55831L7.65007 10.0583L11.1001 6.61668C11.3417 6.36668 11.7417 6.36668 11.9834 6.61668C12.2251 6.85834 12.2251 7.25001 11.9834 7.50001Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
};
